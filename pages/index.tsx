import { Paper, Grid, Button } from '@material-ui/core'
import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import { login } from './rest/requests'
import { loginResponseHandler } from './rest/responseHandlers'

import NameLoginField from '../components/NameLoginField'
import PasswordLoginField from '../components/PasswordLoginField'

const Home = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const usernameInputRef = useRef<HTMLInputElement>()

  const errorHandler = useCallback(() => {
    setIsError(true)
    usernameInputRef.current.focus()
    usernameInputRef.current.setSelectionRange(0, usernameInputRef.current.value.length)
  }, [])

  const submitHandler = useCallback(() => {
    login({ username, password }).then((res) => {
      loginResponseHandler(res)
        .then(() => {
          router.push('/table')
        })
        .catch(() => {
          errorHandler()
        })
    })
  }, [username, password])

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || (e.target as HTMLElement).tagName === 'BUTTON') return
      submitHandler()
    },
    [submitHandler]
  )

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Paper style={{ padding: 30 }} onKeyDown={keyDownHandler}>
        <Grid container>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <NameLoginField
                isError={isError}
                inputRef={usernameInputRef}
                setUsername={setUsername}
                setIsError={setIsError}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <PasswordLoginField setPassword={setPassword} />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button
              type="submit"
              onClick={submitHandler}
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Home
