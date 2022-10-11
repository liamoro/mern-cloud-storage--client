import React from 'react'
import "./uploadFile.scss"
import {useDispatch} from 'react-redux'
import {removeUploadFile} from '../../../reducers/uploadReducer'


function UploadFile({file}) {
  const dispatch = useDispatch()

  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='upload-file__title'>{file.name}</div>
        <button className='upload-file__delete' onClick={() => dispatch(removeUploadFile(file.id))}></button>
      </div>
      <div className='upload-file__progress-bar'>
        <div className='upload-file__upload-bar' style={{width: file.progress + "%"}}/>
        <div className='upload-file__percent'>{file.progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile
