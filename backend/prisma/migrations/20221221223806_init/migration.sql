-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ONLINE', 'INPERSON', 'HYBRID');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organizationId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "greeting" TEXT NOT NULL DEFAULT 'Welcome to the event!',
    "type" "EventType" NOT NULL,
    "maxAttendees" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "startTime" TIMETZ NOT NULL,
    "endTime" TIMETZ NOT NULL,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "allowUnregistered" BOOLEAN NOT NULL DEFAULT false,
    "addressLatitude" DOUBLE PRECISION NOT NULL,
    "addressLongitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
