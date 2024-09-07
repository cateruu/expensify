import { CustomErrorHandler } from './custom.error';

export class DuplicateError extends CustomErrorHandler {
  constructor(message: string) {
    super(message, 409, 'DuplicateError');
  }
}
