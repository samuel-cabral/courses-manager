import { useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (formData: FormData) => Promise<FormState>,
  initialState?: FormState,
  onSuccess?: () => void,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: '',
      errors: null,
    },
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const formData = new FormData(form)

    startTransition(async () => {
      const state = await action(formData)

      setFormState(state)

      if (state.success && onSuccess) {
        onSuccess()
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}
