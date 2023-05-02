import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'
import { Event } from 'events/schemas'

export const Organization = z.object({
  organizationId: z.string().uuid(),
  organizationName: z.string()
})

export const Attendees = z.object({
  userId: z.string().uuid(),
  points: z.number()
})

const GetOrgEventsParams = z.object({
  organizationId: z.string().uuid()
})
export type GetOrgEventsParams = z.infer<typeof GetOrgEventsParams>

const GetOrganizationsResponse = z.array(Organization)

const CreateOrganizationBody = Organization.omit({
  organizationId: true
}).extend({
  userId: z.string().uuid()
})
export type CreateOrganizationBody = z.infer<typeof CreateOrganizationBody>

const CreateOrganizationResponse = Organization

const DeleteOrganizationResponse = Organization

const GetOrgDeletionParams = z.object({
  organizationId: z.string().uuid()
})
export type GetOrgDeletionParams = z.infer<typeof GetOrgDeletionParams>

const GetOrgEventsResponse = Organization.extend({
  events: z.array(Event)
})

const GetOrganizationsByUserParams = z.object({
  userId: z.string().uuid()
})
export type GetOrganizationsByUserParams = z.infer<
  typeof GetOrganizationsByUserParams
>

const GetOrgAttendeesParams = z.object({
  organizationId: z.string().uuid()
})
export type GetOrgAttendeesParams = z.infer<typeof GetOrgAttendeesParams>

const GetOrgAttendeesResponse = Organization.extend({
  pointCounts: z.array(Attendees)
})

export const { schemas: organizationSchemas, $ref } = buildJsonSchemas(
  {
    CreateOrganizationBody,
    CreateOrganizationResponse,
    GetOrgEventsParams,
    GetOrgDeletionParams,
    GetOrgAttendeesParams,
    GetOrganizationsByUserParams,
    GetOrganizationsResponse,
    GetOrgEventsResponse,
    GetOrgAttendeesResponse,
    DeleteOrganizationResponse
  },
  { $id: 'Organizations' }
)
