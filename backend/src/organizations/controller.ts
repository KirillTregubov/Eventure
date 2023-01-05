import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'
import { CreateOrganizationBody } from './schemas'

export const getOrganizations = async (prisma: PrismaClient) => {
  const organizations = await prisma.organization.findMany()
  return organizations
}

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
            userId: '12da9d6b-0662-46c3-aec8-ab10067dfbe5' // 5
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
