import { FastifyRequest } from 'fastify'
import { Prisma, PrismaClient } from '@prisma/client'
import { UniqueConstraintException } from 'lib/exceptions'

export const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany()
  return users
}

export const createUser = async (prisma: PrismaClient, req: FastifyRequest) => {
  try {
    console.log(req.body)
    // const { username, firstName, lastName, email } = req.body

    const user = { cool: 'cool' }
    // const user = await prisma.user.create({
    //   data: {
    //     username,
    //     firstName,
    //     lastName,
    //     email
    //   }
    // })
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
