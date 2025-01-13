// src/permissions.ts
import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can }) {
    can('manage', 'all')
  },
  STUDENT(user, { can }) {
    can(['get', 'create'], 'User', { id: user.id })
    can(['get'], 'Course')
    can(['get', 'create'], 'Enrollment', { userId: user.id })
  },
}
