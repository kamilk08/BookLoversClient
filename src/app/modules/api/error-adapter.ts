import { Injectable } from "@angular/core";
import { Adapter } from "../shared";
import { ApiError } from "./api-error.model";

@Injectable()
export class ApiErrorAdapter implements Adapter<ApiError> {

  adapt(item: any): ApiError {

    if (item === undefined) return undefined;

    const error: ApiError = {
      Type: item.Type,
      Title: item.Title,
      Errors: item.Errors,
      Status: item.Status,
      getFirstValidationError: ApiError.prototype.getFirstValidationError
    };

    return error;
  }


}
