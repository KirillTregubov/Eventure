-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ONLINE', 'INPERSON', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventDetailType" AS ENUM ('TEXT', 'LINK');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
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
    "eventName" TEXT NOT NULL,
    "greeting" TEXT NOT NULL DEFAULT 'Welcome to the event!',
    "eventType" "EventType" NOT NULL,
    "maxAttendees" INTEGER,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "startTime" TIME(0) NOT NULL,
    "endTime" TIME(0) NOT NULL,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "allowUnregistered" BOOLEAN NOT NULL DEFAULT false,
    "addressLatitude" DOUBLE PRECISION NOT NULL,
    "addressLongitude" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PointCount" (
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "EventDetail" (
    "detailId" TEXT NOT NULL,
    "detailName" TEXT NOT NULL,
    "detailType" "EventDetailType" NOT NULL,
    "content" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventDetail_pkey" PRIMARY KEY ("detailId")
);

-- CreateTable
CREATE TABLE "_OrganizationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_eventId_key" ON "Attendance"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "PointCount_userId_organizationId_key" ON "PointCount"("userId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToUser_AB_unique" ON "_OrganizationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToUser_B_index" ON "_OrganizationToUser"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointCount" ADD CONSTRAINT "PointCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointCount" ADD CONSTRAINT "PointCount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDetail" ADD CONSTRAINT "EventDetail_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
