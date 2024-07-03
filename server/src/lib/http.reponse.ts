export class HttpErrorResponse extends Error {
  statusCode: number;
  constructor(message: string = "Client error", statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class BadRequest extends HttpErrorResponse {
  constructor(message: string = "Bad request", statusCode: number = 401) {
    super(message, statusCode);
  }
}

export class MissingParameter extends BadRequest {
  constructor(message: string = "Missing parameter", statusCode?: number) {
    super(message, statusCode);
  }
}

export class InvalidParameter extends BadRequest {
  constructor(message: string = "Invalid parameter", statusCode?: number) {
    super(message, statusCode);
  }
}
