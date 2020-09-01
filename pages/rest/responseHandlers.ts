export async function loginResponseHandler(response: Response) {
  return new Promise((res, rej) => {
    if (response.ok) {
      response.json().then((json: { token: string }) => {
        localStorage.setItem('token', json.token)
        res()
      })
    } else {
      rej()
    }
  })
}
