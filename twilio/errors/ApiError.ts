export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number = 400) {
        super();
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}
