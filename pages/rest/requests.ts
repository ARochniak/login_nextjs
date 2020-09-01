export function login(usersData: { username: string; body: string }) {
  const body = JSON.stringify(usersData)
  return fetch('/api/login', { method: 'POST', body })
}
