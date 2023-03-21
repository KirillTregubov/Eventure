import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'
import { Event } from 'events/schemas'
import { GetUserParams } from 'users/schemas'

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

export const { schemas: organizationSchemas, $ref } = buildJsonSchemas(
  {
    GetOrganizationsResponse,
    CreateOrganizationBody,
    CreateOrganizationResponse,
    GetOrgEventsParams,
    GetOrgEventsResponse,
    GetUserParams
  },
  { $id: 'Organizations' }
)
