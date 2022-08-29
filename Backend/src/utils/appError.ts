export default class AppError extends Error {
  statusCode:number;
  status: string;
  isOperationalError: boolean;
  
  constructor(message:string, statusCode:number) {
    super(message);

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
