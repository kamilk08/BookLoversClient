import { Injectable } from "@angular/core";
import { ApiError } from "../../api/api-error.model";
import { MesssagesFacade } from "../../shared/store/messages/message.facade";
import { ErrorsFacade } from "../store/errors.facade";

@Injectable()
export class ErrorActions {

  private dict: any;

  constructor(private readonly messagesFacade: MesssagesFacade, private errorsFacade: ErrorsFacade) {
    this.dict = {
      400: (error: ApiError) => this.messagesFacade.showFaliureMessage(error.getFirstValidationError().ErrorMessage),
      403: () => this.errorsFacade.throwForbiddenError('Forbidden'),
      404: () => this.errorsFacade.throwNotFoundError('Not found'),
      405: () => this.messagesFacade.showFaliureMessage('Something went wrong 😟'),
      409: (error: ApiError) => this.messagesFacade.showFaliureMessage(error.getFirstValidationError().ErrorMessage)
    };
  }

  reactToApiError(error: ApiError) {
    const errorHandler = this.dict[error.Status];
    if (!errorHandler) return;

    errorHandler(error);
  }

  getErrorAction(errorCode: number, error: any) {
    return this.dict[errorCode](error);
  }

}
