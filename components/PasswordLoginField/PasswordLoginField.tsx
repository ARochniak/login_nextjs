import React, { useCallback } from 'react'
import { TextField } from '@material-ui/core'

interface PasswordLoginFieldProps {
  setPassword: (name: string) => void
}

export default function PasswordLoginField({ setPassword }: PasswordLoginFieldProps) {
  const passwordChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value
    setPassword(password)
  }, [])

  return (
    <TextField
      id="username"
      label="Username"
      type="text"
      onChange={passwordChangeHandler}
      fullWidth
      autoFocus
      required
    />
  )
}
