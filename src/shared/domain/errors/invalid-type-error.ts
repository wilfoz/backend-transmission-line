export class InvalidTypeError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'InvalidTypeError';
  }
}
