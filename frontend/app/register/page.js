'use client'
import { useState } from 'react'
import Container from '../components/auth/container'
import FooterAuth from '../components/auth/footerAuth'
import InputAuth from '../components/auth/inputAuth'
import { registerService } from '../_api/auth'
import toast from 'react-hot-toast'
import { verificar } from './verificar'
import Link from 'next/link'
import useErrors from './useErrors'
import UseToken from '../hooks/token'

const notifyOk = (msg) => toast.success(msg)
const notifyError = (msg) => toast.error(msg)

const Register = () => {
  const [fullname, setFullname] = useState('John Doe Jr 2')
  const [email, setEmail] = useState('jhondoeJr@gmail.com')
  const [password, setPassword] = useState('Password123$')
  const [repeatPassword, setRepeatPassword] = useState('Password123$')
  const { setToken} = UseToken()

  const {
    errors,
    setErrors,
    errorRef,
    validarEmail,
    validarFullname,
    validarPassword,
    validarRepeatPassword,
  } = useErrors()

  const resetTokenAndErrorRef = () => {
    
    setToken(null)
    errorRef.current = false
  }

  const saveTokenAndResetData = (t) => {
    
    setToken(t)
    setErrors('')
    errorRef.current = false
  }  

  const handleSubmit = async (e) => {
    e.preventDefault()
    validarRepeatPassword(password, repeatPassword)
    validarPassword(password)
    validarEmail(email)
    validarFullname(fullname)
  
    if (errorRef.current != true) {
      const response = await registerService(fullname, email, password)
      if (response?.status === 201) {
        notifyOk('Register Exitoso')
        saveTokenAndResetData(response.data.data.token)
      } else {
        if (response.response.data.errors.message.includes('E11000')) {
          // notifyError('Prohibido hackear este sitio')
          notifyError('El email que usaste ya esta registrado!')
        }
        notifyError('Register Fallido')
        setErrors('')
        resetTokenAndErrorRef()
      }
    } else {
      resetTokenAndErrorRef()
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="min-w-[414px]">
        <div className="card flex-shrink-0 w-full max-w-sm">
          <div className="card-body bg-primary text-primary-content">
            <h1 className="text-3xl font-bold text-center lg:text-start">
              Registro
            </h1>
            <InputAuth
              title="Nombre y Apellido"
              type="text"
              placeholder="Ingrese su nombre y apellido"
              value={fullname}
              changeValue={setFullname}
              error={errors?.fullname}
            />
            <InputAuth
              title="E-mail"
              type="text"
              placeholder="vetcare@gmail"
              value={email}
              changeValue={setEmail}
              error={errors?.email}
            />
            <InputAuth
              title="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              changeValue={setPassword}
              error={errors?.password}
            />
            <InputAuth
              title="Confirmar contraseña"
              type="password"
              placeholder="repite tu contraseña"
              value={repeatPassword}
              changeValue={setRepeatPassword}
              error={errors?.repeatPassword}
            />
            <div className="form-control mt-6">
              <button className="btn btn-accent text-accent-content">
                Registrarse
              </button>
              <Link
                href="/login"
                className="btn btn-outline mt-2 border-accent text-accent hover:bg-primary hover:border-[#FF7E5B] hover:text-[#FF7E5B]"
              >
                Iniciar Sesión
              </Link>
            </div>
            <FooterAuth text="O registrarse con" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Register
