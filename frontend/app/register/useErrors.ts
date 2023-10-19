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

  function validarFullname(fullname: string) {
    const regex = /^[A-Za-záéíóúüÁÉÍÓÚÜñÑ\s\-]{5,40}$/
    if (!regex.test(fullname)) {
      setErrors({ fullname: 'Ingresaste un caractér no permitido' })
      errorRef.current = true
    }
    if (fullname.length == 0) {
      setErrors({ fullname: 'El nombre y apellido es obligatorio' })
      errorRef.current = true
    }
  }

  function validarPassword(password: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&()*+\/?@\[\]^_{|}~-])[A-Za-z\d!#$%&()*+\/?@\[\]^_{|}~-]{8,12}$/
    if (!regex.test(password)) {
      setErrors({ password: 'Ingresa una contraseña válida ' })
      errorRef.current = true
    }
    if (password.length == 0) {
      setErrors({ password: 'La contraseña es obligatoria' })
      errorRef.current = true
    }
  }

  function validarRepeatPassword(password: string, repeatPassword: string) {
    if (password !== repeatPassword) {
      setErrors({ repeatPassword: 'Las contraseñas no coinciden' })
      errorRef.current = true
    }
  }

  return {
    errors,
    errorRef,
    setErrors,
    validarEmail,
    validarPassword,
    validarFullname,
    validarRepeatPassword,
  }
}

export default useErrors
