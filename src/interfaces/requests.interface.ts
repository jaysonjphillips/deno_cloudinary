export interface BaseErrorResponse {
    status: number;
    statusText: string;
    error: ErrorMessage;
}

interface ErrorMessage {
    message: string;
}