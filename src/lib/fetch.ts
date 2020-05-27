import { FetchRequestObject } from "../types.ts";

const reqHeaders = [
  ["Content-Type", "application/json"],
  ["Accept", "application/json"],
];

export async function doGet(
  path: string,
  headers: Array<Array<string>>,
  params?: string,
) {
  return fetch(path, {
    method: "GET",
    headers: [...reqHeaders, ...headers],
  });
}

export async function doPost(
  path: string,
  headers: Array<Array<string>>,
  body: { [index: string]: any },
) {
  return fetch(path, {
    method: "POST",
    headers: [...reqHeaders, ...headers],
    body: JSON.stringify(body),
  });
}

export async function doPut(
  path: string,
  headers: Array<Array<string>>,
  body: { [index: string]: any },
) {
  return fetch(path, {
    method: "PUT",
    headers: [...reqHeaders, ...headers],
    body: JSON.stringify(body),
  });
}

export async function doDelete(path: string, headers: Array<Array<string>>) {
  return fetch(path, {
    method: "DELETE",
    headers: [...reqHeaders, ...headers],
  });
}

export async function handleResponse<T, U>(response: Response): Promise<T | U> {
  if (response.ok) return await response.json() as T;
  return await response.json() as U;
}
