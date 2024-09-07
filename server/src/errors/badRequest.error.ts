import { CustomErrorHandler, ErrorMessages } from './custom.error';

export class BadRequestError extends CustomErrorHandler {
  errors: ErrorMessages | undefined;

  constructor(message: string, errors?: ErrorMessages) {
    super(message, 400, 'BadRequestError');
    this.errors = errors;
  }
}
