import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  STUDENT(user, { can }) {
    can(['get'], 'Course')
    can(['get', 'create'], 'Enrollment', { userId: { $eq: user.id } })
  },
}
