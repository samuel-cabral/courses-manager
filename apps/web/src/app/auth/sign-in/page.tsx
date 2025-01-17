import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignIn() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <Separator />

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Don&apos;t have an account? Sign up.</Link>
      </Button>
    </form>
  )
}
