export function generateQueryParams(params: any): string {
    return "?" + Object.keys(params).map(param => `${param}=${params[param]}`).join("&")
} 