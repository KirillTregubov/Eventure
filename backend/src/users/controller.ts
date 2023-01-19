import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'
import { CreateUserBody } from './schemas'

export const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany()
  return users
}

export const getUser = async (prisma: PrismaClient, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId
    },
    include: {
      organizations: true,
      pointCounts: true,
      attendances: true
    }
  })
  //const 
  return user
}

export const createUser = async (
  prisma: PrismaClient,
  body: CreateUserBody
) => {
  try {
    const { username, firstName, lastName, email } = body
    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email
      }
    })
    console.log(user)
    return user
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        if ((error.meta?.target as string[]).includes('username')) {
          throw new UniqueConstraintException('Username taken')
        } else if ((error.meta?.target as string[]).includes('email')) {
          throw new UniqueConstraintException('Email already in use')
        }
      }
    }
    throw error
  }
}
