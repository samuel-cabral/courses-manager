'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    { success: false, message: '', errors: null },
    () => {
      router.push('/')
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" />
          {errors?.email && (
            <p className="text-destructive text-sm">{errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
          {errors?.password && (
            <p className="text-destructive text-sm">{errors.password[0]}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with email'
          )}
        </Button>

        <div className="text-center">
          <Button variant="link" size="sm" asChild>
            <Link
              href="/auth/sign-up"
              className="text-sm text-foreground hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
