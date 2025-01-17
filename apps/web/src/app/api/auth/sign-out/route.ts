import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies()

  cookiesStore.delete('token')

  const response = NextResponse.redirect(new URL('/auth/sign-in', request.url))

  response.cookies.delete('token')

  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.headers.set('Pragma', 'no-cache')

  return response
}
