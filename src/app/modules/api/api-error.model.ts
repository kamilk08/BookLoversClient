import { ValidationError } from "./validation-error.model";

export class ApiError {
  Type: string
  Title: string
  Status: number
  Errors: Array<ValidationError>

  constructor() {
    this.Errors = new Array<ValidationError>();
  }

  public getFirstValidationError(): ValidationError {
    const key = Object.keys(this.Errors)[0];

    return this.Errors[key];
  }

  public static notFound() {
    let error = new ApiError();
    error.Status = 404;
    error.Title = 'Not found';

    return error;
  }

}
