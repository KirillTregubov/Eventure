import prisma from "models/prisma.model";
import { Request } from "express";

export const createEvent = async (req: Request) => {
  try {
    // TODO: zero out seconds and milliseconds for start and end time

    // req.body.name
    const event = await prisma.event.create({
      data: {
        eventName: "Event 1",
        greeting: "Welcome to the Event!",
        eventType: "ONLINE",
        maxAttendees: 10,
        price: 10.0,
        startDate: new Date("2023-03-02"),
        endDate: new Date("2023-03-03"),
        startTime: new Date("2023-03-03T14:00:00.000Z"),
        endTime: new Date("2023-03-04T01:00:00.000Z"),
        pointsEarned: 100,
        allowUnregistered: false,
        addressLatitude: 43.653225,
        addressLongitude: -79.383186,
        organization: {
          connect: {
            organizationId: "b1cf3498-72cf-45bd-9481-86fd247b3896",
          },
        },
      },
    });
    return event;
  } catch (error: unknown) {
    throw error;
  }
};
