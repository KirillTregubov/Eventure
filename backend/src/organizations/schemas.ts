import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'
import { Event } from 'events/schemas'

export const Organization = z.object({
  organizationId: z.string().uuid(),
  organizationName: z.string()
})

const GetOrgEventsParams = z.object({
  organizationId: z.string().uuid()
})
export type GetOrgEventsParams = z.infer<typeof GetOrgEventsParams>

const GetOrganizationsResponse = z.array(Organization)

const CreateOrganizationBody = Organization.omit({ organizationId: true })
export type CreateOrganizationBody = z.infer<typeof CreateOrganizationBody>

const CreateOrganizationResponse = Organization

const GetOrgEventsResponse = Organization.extend({
  events: z.array(Event)
})

const GetOrganizationsByUserParams = z.object({
  userId: z.string().uuid()
})
export type GetOrganizationsByUserParams = z.infer<
  typeof GetOrganizationsByUserParams
>

export const { schemas: organizationSchemas, $ref } = buildJsonSchemas(
  {
    GetOrganizationsResponse,
    CreateOrganizationBody,
    CreateOrganizationResponse,
    GetOrgEventsParams,
    GetOrgEventsResponse,
    GetOrganizationsByUserParams
  },
  { $id: 'Organizations' }
)
