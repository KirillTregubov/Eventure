import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'
import { CreateOrganizationBody } from './schemas'

export const getOrganizations = async (prisma: PrismaClient) => {
  const organizations = await prisma.organization.findMany()
  return organizations
}

export const getOrgEvents = async (prisma: PrismaClient) => {}

// TODO: getOrganizationById, getOrganizationsByUser

export const createOrganization = async (
  prisma: PrismaClient,
  body: CreateOrganizationBody
) => {
  try {
    // TODO: mandate that this is called by a user
    const organization = await prisma.organization.create({
      data: {
        organizationName: body.organizationName,
        admins: {
          connect: {
            userId: '9e667f07-4b63-4951-91fa-86544d7bcfd1' // 5
          }
        }
      }
    })
    return organization
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        if ((error.meta?.target as string[]).includes('organizationName')) {
          throw new UniqueConstraintException('Organization name taken')
        }
      }
    }
    throw error
  }
}
