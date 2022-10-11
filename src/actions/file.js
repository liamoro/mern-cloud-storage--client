import axios from 'axios'
import { hideLoader, showLoader } from '../reducers/appReducer';
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import { addUploadFile, changeUploadFile, showUploader } from '../reducers/uploadReducer';
import { auth } from './user';
import {API_URL} from '../config'
 
export function  getFiles(dirId, sort) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      
      // start имитация загрузки пока к файлам слишком быстрый доступ
        let sleep = async (ms) => {
          return new Promise ( resolve => setTimeout(resolve, ms))
        }
        await sleep(300)
      // 

      let url = `${API_URL}api/files`
      if (dirId) url = `${API_URL}api/files?parent=${dirId}`
      if (sort) url = `${API_URL}api/files?sort=${sort}`
      if (dirId && sort) url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`

      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(setFiles(response.data))
      // console.log("file.js ", response.data)
    } catch (e) {
      alert(e.response.data.message || e)
    } finally {
      dispatch(hideLoader())
    }
  }
}



export function  createDir(dirId, name) {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}api/files`, {
        name,
        parent: dirId,
        type: 'dir'

      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(addFile(response.data))
    } catch (e) {
      if (e.response.status === 401 && e.response.statusText === "Unauthorized") {
        console.log("User is unauthorized!")
        dispatch(auth())
      }
      alert(e.response.data.message)
    }
  }
}

export function  uploadFile(file, dirId) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirId) {
        formData.append('parent', dirId)
      }

      // start Uploader window
      // console.log("HERE file:: ", file)
      let uploadFile = {name: file.name, progress: 0, id: Date.now()}
      dispatch(showUploader())
      // console.log(uploadFile)
      dispatch(addUploadFile(uploadFile))
      // end Uploader window


      const response = await axios.post(`${API_URL}api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength) {
              dispatch(changeUploadFile({...uploadFile, progress: Math.round((progressEvent.loaded * 100) / totalLength)  }))
          }
        }
      })
      dispatch(addFile(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export async function downloadFile(file) {
  try {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {

      // для скачивания создаем невидимую ссылку, имитируем клик по ней и удаляем

      const blob = await response.blob() // подобный физическому файлу объект
      const downloadUrl = window.URL.createObjectURL(blob)  // создаем ссылку для скачанивания в формате blob
      const link = document.createElement('a')
      link.href = downloadUrl 
      link.download = file.name // имя для скачиваемого файла
      document.body.appendChild(link)
      link.click() // имитируем клик
      link.remove() // удаляем элемент из дом
      
    }
  } catch (e) {
    console.log(e)
  }
}

export function deleteFile(file) {
  return async dispatch => { 
    try {
      const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(deleteFileAction(file._id))
      alert(response.data.message)

    } catch (e) {
      console.log(e?.response?.data?.message)
    }
  }
}

export function searchFiles(search) {
  return async dispatch => {
    try {
      let url = `${API_URL}api/files/search?search=${search}`

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(setFiles(response.data))

    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoader())
    }
  }
}


export function uploadAvatar(file) {
  return async dispatch => {
    try {
      let url = `${API_URL}api/files/avatar`

      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(setFiles(response.data))

    } catch (e) {
      console.log(e)
    } finally {
      dispatch(hideLoader())
    }
  }
}