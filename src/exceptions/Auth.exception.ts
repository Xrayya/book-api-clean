export class AuthenticationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Authentication Error";
  }
}

export class AuthorizationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Authorization Error";
  }
}
