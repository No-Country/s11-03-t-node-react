import { useState, useRef } from 'react'

const useErrors = () => {
  const [errors, setErrors] = useState<Object | null>(null)
  const errorRef = useRef(false)

  function validarEmail(email: string) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      setErrors({ email: 'Ingrese un mail válido' })
      errorRef.current = true
    }
    if (email.length === 0) {
      setErrors({ email: 'El campo email es obligatorio' })
      errorRef.current = true
    }
  }
  function validarPassword(password: string) {
    if (password.length == 0) {
      setErrors({ password: 'La contraseña es obligatoria' })
      errorRef.current = true
    }
  }

  return { errors, errorRef, setErrors, validarEmail, validarPassword }
}

export default useErrors
