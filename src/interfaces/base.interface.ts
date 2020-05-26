export interface BaseRequestParameters {}

export interface BaseAPIResponseData {}

interface RequestOptions {
    method: string;
    headers: Array<any>
}

export interface FetchRequestObject {
    url: string;
    auth_string: string;
    options: RequestOptions;
}