'use client'
import { useState, useRef, useEffect } from 'react'
import { loginService } from '../_api/auth'
import toast from 'react-hot-toast'
import Container from '../components/auth/container'
import FooterAuth from '../components/auth/footerAuth'
import InputAuth from '../components/auth/inputAuth'
import Link from 'next/link'
import useErrors from './useErrors'
import { useRouter } from 'next/navigation'
import UseToken from '../hooks/useToken'
import { useLoader } from '../hooks/useLoader'
import { Loader } from '../components/loader'

const notifyOk = (msg) => toast.success(msg)
const notifyError = (msg) => toast.error(msg)

const Login = () => {
  const [email, setEmail] = useState('julianalvarez@gmail.com')
  const [password, setPassword] = useState('Password123$')
  const { setToken } = UseToken()
  const router = useRouter()
  const { isLoading, openLoader, closeLoader } = useLoader()

  const { errors, setErrors, errorRef, validarEmail, validarPassword } =
    useErrors()

  const resetTokenAndErrorRef = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token')
      setToken(null)
    }

    errorRef.current = false
  }

  const saveTokenAndResetData = (t) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', t)
      setToken(t)
      setErrors('')
      errorRef.current = false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    validarEmail(email)
    validarPassword(password)

    if (errorRef.current != true) {
      openLoader()
      const response = await loginService(email, password)
      if (response?.status === 200) {
        notifyOk('Login Exitoso')
        saveTokenAndResetData(response.data.data.token)
        setTimeout(() => router.push('/'), 2000)
        // closeLoader()
        router.refresh()
      } else {
        notifyError('Las credenciales son incorrectas')
        setErrors('')
        resetTokenAndErrorRef()
        closeLoader()
      }
    } else {
      resetTokenAndErrorRef()
    }
  }

  return (
    <>
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
                placeholder="vetcarfamily@gmail.comgmail"
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
              <Loader isLoading={isLoading} />
              {!isLoading && (
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
              )}
              <FooterAuth text="O iniciar sesión con" />
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}

export default Login
