import { FastifyRequest } from 'fastify'
import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'

export const getOrganizations = async (prisma: PrismaClient) => {
  const organizations = await prisma.organization.findMany()
  return organizations
}

export const createOrganization = async (
  prisma: PrismaClient,
  req: FastifyRequest
) => {
  try {
    // req.body.name
    // mandate that this is called by a user

    const organization = await prisma.organization.create({
      data: {
        organizationName: 'Organization 1',
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
          throw new UniqueConstraintException('Organization Name taken')
        }
      }
    }
    throw error
  }
}
