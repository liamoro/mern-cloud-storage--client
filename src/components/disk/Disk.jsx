import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../actions/file.js'
import FileList from './filelist/FileList'
import './disk.scss'
import './loader.scss'
import Popup from './Popup.jsx'
import { popToStack, setCurrentDir, setFileView, setPopupDisplay } from '../../reducers/fileReducer.js'
import listImg from '../../assets/img/list.svg'
import plateImg from '../../assets/img/plate-m.svg'
import Uploader from './uploader/Uploader.jsx'

function Disk() {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.app.loader)
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')


  function showPopupHandler() {
      dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler() {
    const backDirId = dirStack[dirStack.length - 1]
    dispatch(popToStack(dirStack.length - 1))
    dispatch(setCurrentDir(backDirId))
  }

  function fileUploadHandler (event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  function dragEnterHandler (event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler (event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  function dropHandler (event) {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    setDragEnter(false)
  }
  
  useEffect(() => {
    // console.log(sort)
    // let selection = document.getSelection();
    // console.log(selection)
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])


  if (loader === true) {
    return (<div className='loader'>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>)
  }
  
  return ( !dragEnter ? 
    <div className='disk'  onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
      <div className='disk__btns'>
        {currentDir && <button className='btn disk__btn disk__back btn-back' onClick={() => backClickHandler()}></button>}
        <button className='btn disk__btn disk__create' onClick={() => showPopupHandler()}>Создать папку</button>
        <div className='disk__upload'>
          <label htmlFor='disk__upload-input' className='btn disk__upload-label'>Загрузить файл</label>
          <input multiple={true} onChange={event => fileUploadHandler(event)}  type='file' id='disk__upload-input' className='disk__upload-input'></input>
        </div>
        <select className='btn disk__select'
                value={sort}
                onChange={(e) => setSort(e.target.value)}>
          <option value='name'>По имени</option>
          <option value='type'>По типу</option>
          <option value='date'>По дате</option>
        </select>

        <button className='btn disk__plate' onClick={() => dispatch(setFileView('plate'))} ></button>
        <button className='btn disk__list ' onClick={() => dispatch(setFileView('list'))} ></button>

      </div>
      <FileList />
      <Popup/>
      <Uploader/>
    </div>
    :
    <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Перетащите файлы сюда
    </div>
  )
}

export default Disk
