'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface HeaderProps {
  userEmail: string
}

export function Header({ userEmail }: HeaderProps) {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/auth/sign-out', {
      method: 'GET',
    })

    router.push('/auth/sign-in')
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Courses Manager
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{userEmail}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
