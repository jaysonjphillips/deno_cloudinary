import { FetchRequestObject } from "../interfaces/base.interface.ts";

export async function makeAuthenticatedRequest(params: FetchRequestObject) {
    const request_options = {
        method: params.options.method,
        headers: [['Authorization', params.auth_string], ...params.options.headers]
    }
    return await fetch(params.url, request_options)
}   

