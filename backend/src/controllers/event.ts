import { FastifyRequest } from 'fastify'
import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'

export const createEvent = async (
  prisma: PrismaClient,
  req: FastifyRequest
) => {
  try {
    // TODO: zero out seconds and milliseconds for start and end time

    // req.body.name

    const event = await prisma.event.create({
      data: {
        eventName: 'Event 1',
        greeting: 'Welcome to the Event!',
        eventType: 'ONLINE',
        maxAttendees: 10,
        price: 10.0,
        startDate: new Date('2023-03-02'),
        endDate: new Date('2023-03-03'),
        startTime: new Date('2023-03-03T14:00:00.000Z'),
        endTime: new Date('2023-03-04T01:00:00.000Z'),
        pointsEarned: 100,
        allowUnregistered: false,
        addressLatitude: 43.653225,
        addressLongitude: -79.383186,
        organization: {
          connect: {
            organizationId: 'b1cf3498-72cf-45bd-9481-86fd247b3896'
          }
        },
        details: {
          create: {
            detailName: 'detail1',
            detailType: 'TEXT',
            content: 'This is a pop concert'
          }
        }
      }
    })
    return event
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      if ((error.meta?.target as string[]).includes('eventName')) {
        throw new UniqueConstraintException('Event Name taken')
      }
    }
    throw error
  }
}
