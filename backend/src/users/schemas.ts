import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const User = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email()
})

const GetUsersResponse = z.array(User)

const CreateUserBody = User.omit({ userId: true })
export type CreateUserBody = z.infer<typeof CreateUserBody>

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    GetUsersResponse,
    CreateUserBody,
    CreateUserResponse: User
  },
  { $id: 'Users' }
)
