import { getCookie } from 'cookies-next'
import ky from 'ky'
import { cookies } from 'next/headers'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          const cookieStore = await cookies()
          const token = cookieStore.get('token')?.value

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        } else {
          const token = getCookie('token')

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],
  },
})
