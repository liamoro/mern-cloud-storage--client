import { useEffect, useState } from 'react'
import Input from '../../utils/input/input';
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import './authorization.scss';

function Login() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const credentialsHandler =  (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }
  // const isAuth = localStorage.getItem('token') ? true : false
  const dispatch = useDispatch()

  return (
    
        
          <div className='authorization'>
            <div className='authorization__header'>Авторизация</div>
            <Input type='email' name='email' value={credentials.email} 
            setValue={credentialsHandler}  placeholder='Введите имя...'/>
            <Input type='password' name='password' value={credentials.password} setValue={credentialsHandler}  placeholder='Введите пароль...'/>
            <button className='authorization__btn' onClick={() => {dispatch(login(credentials.email, credentials.password))}}>Войти</button>
          </div>
        
    
    
  )
}

export default Login
