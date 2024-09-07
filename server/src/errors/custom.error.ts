export interface ErrorMessages {
  [key: string]: string[] | undefined;
}

export class CustomErrorHandler extends Error {
  message: string;
  statusCode: number;
  name: string = 'Error';
  errors: ErrorMessages | undefined;
  constructor(
    message: string,
    statusCode: number,
    name: string,
    errors?: ErrorMessages
  ) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.errors = errors;
  }
}
