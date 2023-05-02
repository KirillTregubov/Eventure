import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'
import { CreateOrganizationBody } from './schemas'

export const getOrganizations = async (prisma: PrismaClient) => {
  const organizations = await prisma.organization.findMany()
  return organizations
}

export const getEventsByOrgId = async (
  prisma: PrismaClient,
  organizationId: string
) => {
  const orgEvents = await prisma.organization.findUnique({
    where: {
      organizationId
    },
    include: {
      events: true
    }
  })
  return orgEvents
}

export const getAttendeesByOrgId = async (
  prisma: PrismaClient,
  organizationId: string
) => {
  const orgAttendees = await prisma.organization.findUnique({
    where: {
      organizationId
    },
    include: {
      pointCounts: true
    }

    // select: {
    //   // top 2 attendees
    //   // I know this is probably incorrect, just keeping this as a placeholder value for now until I figure out how to get the top 2 attendees
    //   // pointCounts: {
    //   //   orderBy: {
    //   //     points: 'desc'
    //   //   }
    //   // }
    // }
  })
  return orgAttendees
}

export const getOrganizationsByUser = async (
  prisma: PrismaClient,
  userId: string
) => {
  const organizations = await prisma.organization.findMany({
    where: {
      admins: {
        some: {
          userId
        }
      }
    },
    include: {
      admins: true
    }
  })
  return organizations
}

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
            userId: body.userId // 5
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

export const deleteOrganization = async (
  prisma: PrismaClient,
  organizationId: string
) => {
  const organization = await prisma.organization.delete({
    where: {
      organizationId
    }
  }) // List of all orgs

  // Returning details of deleted organization
  return organization
}
