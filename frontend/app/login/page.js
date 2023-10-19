'use client'
import { useState, useRef } from 'react'
import { loginService } from '../_api/auth'
import toast from 'react-hot-toast'
import Container from '../components/auth/container'
import FooterAuth from '../components/auth/footerAuth'
import InputAuth from '../components/auth/inputAuth'
import Link from 'next/link'
import useErrors from './useErrors'
import { useRouter } from 'next/navigation'
import UseToken from '../hooks/token'




const notifyOk = (msg) => toast.success(msg)
const notifyError = (msg) => toast.error(msg)

const Login = () => {
  const [email, setEmail] = useState('jhondoe@gmail.com')
  const [password, setPassword] = useState('Password123$')
  const {setToken} = UseToken()
  const router = useRouter()
  
  const { errors, setErrors, errorRef, validarEmail, validarPassword } =
    useErrors()

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
    validarEmail(email)
    validarPassword(password)
    
    if (errorRef.current != true) {
      const response = await loginService(email, password)
      if (response?.status === 200) {
        notifyOk('Login Exitoso')
        saveTokenAndResetData(response.data.data.token)
        router.push('/')
        
        router.refresh()
      } else {
        notifyError('Las credenciales son incorrectas')
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
        <div className="card flex-shrink-0 w-full min-w-sm bg-base-300">
          <div className="card-body bg-primary text-primary-content">
            <h1 className="text-3xl font-bold text-center lg:text-left">
              Iniciar Sesión
            </h1>
            {/* {token && (
              <div className="text-sm" style={{ textWrap: 'balance' }}>
                Token: {token.slice(0, 35)}...
              </div>
            )} */}
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
            <div className="flex justify-end">¿Olvidaste la contraseña?</div>
            <div className="form-control mt-6">
              <button className="btn btn-accent text-accent-content hover:bg-[#FF7E5B]">
                Iniciar Sesión
              </button>
              <Link
                href="/register"
                className="btn btn-outline mt-2 border-accent text-accent hover:bg-primary hover:border-[#FF7E5B] hover:text-[#FF7E5B]"
              >
                Registrarse
              </Link>
            </div>
            <FooterAuth text="O iniciar sesión con" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Login
