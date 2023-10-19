import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'
interface Props {
  title: string
  type: string
  placeholder: string
  value: string
  error: string
  changeValue: (value: string) => void
}

const InputAuth = ({
  title,
  type,
  placeholder,
  value,
  error,
  changeValue,
}: Props) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && error) {
      ;(inputRef.current as HTMLInputElement).focus()
    }
  }, [error])

  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={`relative form-control ${error ? 'error' : ''}`}>
      <label className="label">
        <span className="font-bold text-base">{title}</span>
      </label>
      {type == 'password' && (
        <input
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`bg-red-100 input input-bordered rounded-md ${
            error ? 'bg-white border-error' : 'bg-slate-100 border-none'
          } font-base`}
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          autoComplete="off"
        />
      )}
      {type != 'password' && (
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`bg-red-100 input input-bordered rounded-md ${
            error ? 'bg-white border-error' : 'bg-slate-100 border-none'
          } font-base`}
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          autoComplete="off"
        />
      )}
      {type === 'password' && (
        <Image
          src="/eye-slash-closed.png"
          width={20}
          height={20}
          alt="icono de ojo"
          className="absolute float-right top-14 right-4 z-10 cursor-pointer"
          onClick={() => {
            setVisible((previous) => !previous)
          }}
        />
      )}
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  )
}
export default InputAuth
