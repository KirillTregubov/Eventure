import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'
import { Organization } from 'organizations/schemas'

const User = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  points: z.number().optional()
})

const GetUserParams = z.object({
  userId: z.string().uuid()
})
export type GetUserParams = z.infer<typeof GetUserParams>

const GetUsersResponse = z.array(User)

const GetUserResponse = User.extend({
  organizations: z
    .array(Organization.pick({ organizationId: true, organizationName: true }))
    .optional(),
  attendances: z.array(z.string()).optional()
})

const CreateUserBody = User.omit({ userId: true })
export type CreateUserBody = z.infer<typeof CreateUserBody>

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    GetUserParams,
    GetUserResponse,
    GetUsersResponse,
    CreateUserBody,
    CreateUserResponse: User
  },
  { $id: 'Users' }
)
