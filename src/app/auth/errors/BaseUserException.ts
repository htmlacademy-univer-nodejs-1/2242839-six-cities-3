import {HttpError} from '../../controllers/httpLogic/httpError.ts';


export class BaseUserException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
