import { useEffect, useState } from 'react'
import Input from '../../utils/input/input';
import { registration } from '../../actions/user'
import './authorization.scss';

function Registration() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const credentialsHandler =  (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // useEffect(() => {
  // })

  return (
    <div className='authorization'>
      <div className='authorization__header'>Регистрация</div>
      <Input type='email' name='email' value={credentials.email} 
      setValue={credentialsHandler}  placeholder='Введите имя...'/>
      <Input type='password' name='password' value={credentials.password} setValue={credentialsHandler}  placeholder='Введите пароль...'/>
      <button className='authorization__btn' onClick={() => {
        registration(credentials.email, credentials.password)
      }}>Зарегистрироваться</button>
    </div>
  )
}

export default Registration
