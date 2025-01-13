import { z } from 'zod'

import { enrollmentSchema } from '../models/enrollment'

export const enrollmentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Enrollment'), enrollmentSchema]),
])

export type EnrollmentSubject = z.infer<typeof enrollmentSubject>
