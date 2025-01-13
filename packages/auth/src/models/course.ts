import { z } from 'zod'

export const courseSchema = z.object({
  __typename: z.literal('Course').default('Course'),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  createdAt: z.date(),
})

export type Course = z.infer<typeof courseSchema>
