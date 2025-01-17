import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUp() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
        <Input
          name="passwordConfirmation"
          id="passwordConfirmation"
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <Separator />

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Already have an account? Sign in.</Link>
      </Button>
    </form>
  )
}
