import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const Organization = z.object({
  organizationId: z.string().uuid(),
  organizationName: z.string()
})

const GetOrganizationsResponse = z.array(Organization)

const CreateOrganizationBody = Organization.omit({ organizationId: true })
export type CreateOrganizationBody = z.infer<typeof CreateOrganizationBody>

const CreateOrganizationResponse = Organization

export const { schemas: organizationSchemas, $ref } = buildJsonSchemas(
  {
    GetOrganizationsResponse,
    CreateOrganizationBody,
    CreateOrganizationResponse
  },
  { $id: 'Organizations' }
)
