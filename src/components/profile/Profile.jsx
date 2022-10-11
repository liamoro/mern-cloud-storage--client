import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { uploadAvatar } from '../../actions/user'
import { deleteAvatar } from '../../actions/user'
import "./profile.scss";
import avatarImgDefault from '../../assets/img/avatar.svg'
import {API_URL} from '../../config'

function Profile() {
  const dispatch = useDispatch()
  const avatar = useSelector(state => state.user.currentUser.avatar)

  function avatarUploadHandler(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
  }
  return (
    <div className='profile'>
      <NavLink to={'/'}><button className='btn btn-default btn-back profile__btn-back'></button></NavLink>
      
      <div className='profile__card card'>
        <img src={avatar ? `${API_URL}${avatar}` : avatarImgDefault} className='card__avatar'/>
        <div className='card__btns'>
          <button className='btn btn-default card__btn' onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
          <label htmlFor='card-avatar' className='btn btn-default'>Загрузить аватар</label>
          <input className='card__btn' accept='image/*' type='file' id='card-avatar' placeholder="Загрузить аватар" onChange={(e) => avatarUploadHandler(e)}/>
        </div>
      </div>
    </div>
  )
}

export default Profile
