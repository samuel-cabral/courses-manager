import { z } from 'zod'

export const enrollmentSchema = z.object({
  __typename: z.literal('Enrollment').default('Enrollment'),
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  enrolledAt: z.date(),
})

export type Enrollment = z.infer<typeof enrollmentSchema>
