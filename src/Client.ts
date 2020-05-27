import { Base64 } from "https://deno.land/x/bb64/mod.ts";

import { ClientConfig } from "./types.ts";

import { CloudinaryResourcesReponse, ResourcesByTagParams, SearchRequestError, BaseCloudinaryOptions, ResourceRequestError, ResourcesParams, ResourcesByContextParams, ResourcesByModerationParams, ResourceDetailParams, ResourceDetailOptions, SearchResourceOptions, CloudinarySearchReponse } from "./types.ts"

import { doGet, doPost, handleResponse } from "./lib/fetch.ts";
import { generateQueryParams } from "./lib/utils.ts";

export class Client {
    protected base_url: string = "https://api.cloudinary.com/v1_1/";
    protected auth_header: Array<string>;
    protected api_url: string;
    protected sign_payload = (payload: object): Error => {
        throw new Error("Not Implemented");
    };

    constructor(config: ClientConfig) {
        this.auth_header = ["Authorization", `Basic ${
            Base64.fromString(`${config.api_key}:${config.api_secret}`)
            }`];
        this.api_url = `${this.base_url}/${config.cloud_name}`;
    }

    async resources(
        params: ResourcesParams):
        Promise<CloudinaryResourcesReponse | ResourceRequestError> {

        const response = await doGet(
            `${this.api_url}/resources/${params.resource_type}/${params.delivery_type}`,
            [this.auth_header]);

        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(response)
    }

    async resourcesByTag(
        params: ResourcesByTagParams,
    ): Promise<CloudinaryResourcesReponse | ResourceRequestError> {
        const response = await doGet(`${this.api_url}/resources/${params.resource_type}/tags/${params.resource_tag}`, [this.auth_header]);

        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(response);
    }

    async resourcesByContext(params: ResourcesByContextParams): Promise<CloudinaryResourcesReponse | ResourceRequestError> {

        const response = await doGet(`${this.api_url}/resources/${params.resource_type}/context/`, [this.auth_header])
        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(response);
    };

    async resourcesByModeration(params: ResourcesByModerationParams): Promise<CloudinaryResourcesReponse | ResourceRequestError> {
        const response = await doGet(`${this.api_url}/resources/moderations/${params.moderation_kind}/${params.status}`, [this.auth_header])

        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(response);
    }

    async resourceDetails(params: ResourceDetailParams): Promise<CloudinaryResourcesReponse | ResourceRequestError> {
        const query_params = generateQueryParams(params as ResourceDetailOptions)

        const response = await doGet(`${this.api_url}/resources/${params.resource_type}/${params.delivery_type}/${params.public_id}${query_params}`, [this.auth_header])
        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(response)
    }

    async search(params?: SearchResourceOptions): Promise<CloudinarySearchReponse | SearchRequestError> {
        const request_params_string = params ? generateQueryParams(params) : '';
        const resp = await doGet(`${this.api_url}/resources/search${request_params_string}`, [this.auth_header])
        return handleResponse<CloudinarySearchReponse, SearchRequestError>(resp);
    }

    async updateResource(params: ResourceDetailParams): Promise<CloudinaryResourcesReponse | ResourceRequestError> {
        const resp = await doPost(`${this.api_url}/resources/${params.resource_type}/${params.delivery_type}/${params.public_id}`, [this.auth_header], params)
        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(resp)
    }

    async restoreResources(params: ResourceDetailParams): Promise<CloudinaryResourcesReponse | ResourceRequestError> {
        const resp = await doPost(`${this.api_url}/resources/${params.resource_type}/${params.delivery_type}/restore`,
            [this.auth_header], { public_ids: params.public_ids })
        return handleResponse<CloudinaryResourcesReponse, ResourceRequestError>(resp)
    }
}
