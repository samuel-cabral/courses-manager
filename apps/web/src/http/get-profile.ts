import { api } from './api-client'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface GetProfileResponse {
  user: User
}

export async function getProfile() {
  const response = await api.get('profile').json<GetProfileResponse>()
  return response
}
