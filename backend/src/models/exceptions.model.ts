export class HttpException extends Error {
  errorCode: number;

  constructor(errorCode: number, public readonly message: string | any) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }
}

export class UniqueConstraintException extends HttpException {
  constructor(message: string | any) {
    super(409, message);
  }
}
