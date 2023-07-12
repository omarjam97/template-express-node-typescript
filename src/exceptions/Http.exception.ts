class HttpException extends Error {
    public status: number;

    public message: string;

    public details: object;
    constructor(status: number, message: string, details: object = {}) {
        super();
        this.message = message;
        this.status = status;
        this.details = details;
    }
}

export default HttpException;
