import { CustomErrorHandler } from './custom.error';

export class ForbiddenError extends CustomErrorHandler {
  constructor(message: string) {
    super(message, 403, 'ForbiddenError');
  }
}
