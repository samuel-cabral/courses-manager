import { api } from './api-client'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface GetUsersResponse {
  users: User[]
}

export async function getUsers() {
  const response = await api.get('users').json<GetUsersResponse>()
  return response
}
