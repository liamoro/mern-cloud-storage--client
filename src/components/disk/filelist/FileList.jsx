import React from 'react'
import {useSelector} from "react-redux";
import './filelist.scss'
import File from './file/File'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

function FileList() {
  // useSelector(state => console.log("FileList.jsx start ", state))
  // console.log("FileList state:: ", useSelector(state => state.files.files))

  const files = useSelector(state => state.files.files)
  const fileView = useSelector(state => state.files.view)

  // const files = [{_id:1, name: 'direc', type: 'jpg', size: '5gb', date: '20.02.2020'}, {_id:2, name: 'direc2', type: 'dir', size: '5gb', date: '20.12.2020'}].map( file => <File key={file._id} file={file}/> )

  if (files.length === 0) {
    return <div className='loader'>Файлы не найдены</div>
  }
  if (fileView === 'plate') {
    return (
      <div className='fileplate'>
          {files?.map(file =>
            <File key={file._id} file={file}/>
          )}
      </div>
    )
  }
  if (fileView === 'list') {
    return (
      <div className='filelist'>
        <div className="filelist__header">
          <div className="filelist__name">Название</div>
          <div className="filelist__date">Дата</div>
          <div className="filelist__size">Размер</div>
        </div>
        <TransitionGroup>
          {files?.map(file => {
            return (<CSSTransition
                      key={file._id}
                      timeout={500}
                      classNames={'file'}
                      exit={false}
                      >
                      <File  file={file}/>
                    </CSSTransition>)
          })}
        </TransitionGroup>
      </div>
    )
  }
}

export default FileList
