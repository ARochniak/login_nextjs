import React, { useCallback, MutableRefObject } from 'react'
import { TextField } from '@material-ui/core'

interface NameLoginFieldProps {
  isError: boolean
  inputRef: MutableRefObject<HTMLInputElement>
  setUsername: (name: string) => void
  setIsError: (isError: boolean) => void
}

export default function NameLoginField({ isError, inputRef, setUsername, setIsError }: NameLoginFieldProps) {
  const userNameChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isError) setIsError(false)
      const username = e.currentTarget.value
      setUsername(username)
    },
    [isError]
  )
  return (
    <TextField
      inputRef={inputRef}
      error={isError}
      id="username"
      label="Username"
      type="text"
      onChange={userNameChangeHandler}
      fullWidth
      autoFocus
      required
    />
  )
}
