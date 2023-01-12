import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Buttom from '@/components/Button'
import Input from '@/components/Input'
import loginServices from '@/services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLogged } from '@/redux/slices/userLoggedSlice'
import { RootState } from '@/redux/store'

import './styles.css'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const loggedUser = await loginServices.login({ username, password })
    dispatch(setUserLogged(loggedUser))
    window.localStorage.setItem(
      'loggedCfChat',
      JSON.stringify(loggedUser)
    )

    navigate('/')
  }

  return (
    <form className='LoginForm' onSubmit={handleLogin}>

      <div className='LoginForm--inputContainer'>
        <Input
          type="text"
          value={username}
          name='username'
          placeholder='Nombre de usuario'
          onChange={({target}) => setUsername(target.value)}
        />
        <Input
          type="password"
          value={password}
          name='password'
          placeholder='Contraseña'
          onChange={({target}) => setPassword(target.value)}
        />
      </div>

      <div className='LoginForm--buttonContainer'>
        <Buttom
          styleClass='primary'
          type='submit'
          text='Login'
        />
        <div className='LoginForm--callToAction'>
          <span>¿aún no tienes una cuenta?</span>
        </div>
        <Buttom
          styleClass='secundary'
          type='button'
          text='Registrarme'
          onClick={() => console.log('registro')}
        />
      </div>

    </form>
  )
}

export default LoginForm