import { Prisma, PrismaClient } from '@prisma/client'
import { NotFoundException, UniqueConstraintException } from 'lib/exceptions'
import { CreateEventBody } from './schemas'

export const getEvents = async (prisma: PrismaClient) => {
  const events = await prisma.event.findMany()
  return events
}

export const getEventById = async (prisma: PrismaClient, eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      eventId: eventId
    },
    include: {
      details: true
    }
  })
  if (!event) {
    throw new NotFoundException('Event does not exist')
  }
  return event
}

export const createEvent = async (
  prisma: PrismaClient,
  body: CreateEventBody
) => {
  try {
    const {
      eventName,
      greeting,
      eventType,
      maxAttendees,
      price,
      startDate,
      endDate,
      pointsEarned,
      startTime,
      endTime,
      addressLatitude,
      addressLongitude,
      organizationId
    } = body
    // schema in ./schemas.ts
    console.log(body)
    // TODO: zero out seconds and milliseconds for start and end time

    const event = await prisma.event.create({
      data: {
        eventName,
        greeting,
        eventType,
        maxAttendees,
        price,
        startDate,
        endDate,
        pointsEarned,
        // eventName: 'Event 1',
        // greeting: 'Welcome to the Event!',
        // eventType: 'ONLINE',
        // maxAttendees: 10,
        // price: 10.0,
        // startDate: new Date('2023-03-02'),
        // endDate: new Date('2023-03-03'),
        startTime,
        endTime,
        // pointsEarned: 100,
        // allowUnregistered: false,
        addressLatitude,
        addressLongitude,
        organization: {
          connect: {
            organizationId
          }
        }
        // details: {
        //   create: {
        //     detailName: 'detail1',
        //     detailType: 'TEXT',
        //     content: 'This is a pop concert'
        //   }
        // }
        
      }, include: {
        details: true
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
