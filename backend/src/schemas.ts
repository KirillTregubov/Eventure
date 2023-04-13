import { sharedSchemas } from 'lib/schemas'
import { eventSchemas } from 'events/schemas'
import { organizationSchemas } from 'organizations/schemas'
import { userSchemas } from 'users/schemas'

export default [
  ...sharedSchemas,
  ...eventSchemas,
  ...organizationSchemas,
  ...userSchemas
]
