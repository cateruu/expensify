import { CustomErrorHandler } from './custom.error';

export class UnAuthorizedError extends CustomErrorHandler {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError');
  }
}
