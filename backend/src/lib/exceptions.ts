export class HttpException extends Error {
  errorCode: number

  constructor(errorCode: number, public readonly message: string) {
    super(message)
    this.name = this.constructor.name
    this.errorCode = errorCode
  }
}

export class UniqueConstraintException extends HttpException {
  constructor(public readonly message: string) {
    super(400, message)
  }
}

export class NotFoundException extends HttpException {
  constructor(public readonly message: string) {
    super(404, message)
  }
}
