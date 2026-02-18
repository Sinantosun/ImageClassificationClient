export class BaseResult<T> {

  payload?: T;
  errors?: ErrorModel[];
}

export class ErrorModel {
  errorMessage!: string;
}
