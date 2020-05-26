import { Base64 } from "https://deno.land/x/bb64/mod.ts";

import { ClientConfig } from "./interfaces/client.interface.ts";
import {
  AdminResourceParameters,
  AdminResourcesResponse,
  GetResourcesByTagParameters,
  GetResourcesByContextParameters,
  ModerationStatusParameters,
  ResourceDetailsParameters,
  SearchParameters
} from "./interfaces/admin.interface.ts";
import { makeAuthenticatedRequest } from "./lib/fetch.ts";
import { BaseErrorResponse } from "./interfaces/requests.interface.ts";
import { generateQueryParams } from "./lib/utils.ts";

export class Client {
  protected base_url: string = "https://api.cloudinary.com/v1_1/";
  protected auth_header: string;
  protected api_url: string;
  protected sign_payload = (payload: object): Error => {
    throw new Error("Not Implemented");
  };

  constructor(config: ClientConfig) {
    this.auth_header = `Basic ${
      Base64.fromString(`${config.api_key}:${config.api_secret}`)
    }`;
    this.api_url = `${this.base_url}/${config.cloud_name}`;
  }

  async getResources(
    params: AdminResourceParameters,
  ): Promise<AdminResourcesResponse | BaseErrorResponse> {
    const delivery_type = params.delivery_type || "";
    const response = await fetch(
      `${this.api_url}/resources/${params.resource_type}/${delivery_type}`,
      {
        headers: [["Authorization", this.auth_header]],
      },
    );
    if(response.ok) return await response.json()
    return await response.json()
}

  async getResourcesByTag(
    params: GetResourcesByTagParameters,
  ): Promise<AdminResourcesResponse | BaseErrorResponse> {
    const response = await fetch(
      `${this.api_url}/resources/${params.resource_type}/tags/${params.tag}`,
      {
        headers: [["Authorization", this.auth_header]],
      },
    );

    return await response.json();
  }

  async getResourcesByContext(params: GetResourcesByContextParameters): Promise<AdminResourcesResponse> {
      const response = await fetch(`${this.api_url}/resources/${params.resource_type}/context/`, {
          headers: [['Authorization', this.auth_header]]
      })


      return await response.json();
  };

  async getResourcesByModerationStatus(params:  ModerationStatusParameters): Promise<AdminResourcesResponse> {
    const response = await fetch(`${this.api_url}/resources/moderations/${params.moderation_kind}/${params.status}`, {
        headers: [['Authorization', this.auth_header]]
    })

    return await response.json()
  }

  async getResourceDetails(params: ResourceDetailsParameters): Promise<AdminResourcesResponse> {
      const optional_parameters = Object.keys(params).map(param => `${param}=${params[param]}`).join("&")

      return await (
          await fetch(`${this.api_url}/resources/${params.resource_type}/${params.delivery_type}/${params.public_id}?${optional_parameters}`)
      ).json()
  }

    async search(params: SearchParameters): Promise<AdminResourcesResponse> {
        const request_params = generateQueryParams(params)
        return await (
            await fetch(`${this.api_url}/resources/search${request_params}`, {
                headers: [['Authorization', this.auth_header]]
            })
        ).json()
    }

    async updateDetails(params: ResourceDetailsParameters): Promise<AdminResourcesResponse> {
        return await (
            await fetch(`${this.api_url}/resources/${params.resource_type}/${params.delivery_type}/${params.public_id}`, {
                method: 'POST',
                headers: [['Authorization', this.auth_header]],
                body: JSON.stringify(params)
            })
        ).json()
    }
}
