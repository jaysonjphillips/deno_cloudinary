export interface BaseObject {
  [index: string]: any;
}

export interface BaseObjectWithValue<T> {
  [index: string]: T;
}

/**
 * Fetch/Request Object 
 */

interface RequestOptions {
  method: string;
  headers: Array<any>;
  body: BaseObject;
}

export interface FetchRequestObject {
  url: string;
  auth_string: string;
  options: RequestOptions;
}

/**
 * Request Parameters By API Area
 */

// ADMIN

export interface BaseCloudinaryRequestParams {
  resource_type: "image" | "raw" | "video" | "auto";
}

export interface ResourcesParams extends BaseCloudinaryRequestParams {
  delivery_type?: string;
}

export interface ResourcesByTagParams extends ResourcesParams {
  resource_tag: string;
}

export interface ResourcesByContextParams extends ResourcesParams {
  key: string;
}

export interface ResourcesByModerationParams extends ResourcesParams {
  moderation_kind: "metascan" | "aws_rek" | "webpurify" | "manual";
  status: "pending" | "approved" | "rejected";
}

export interface ResourceDetailParams
  extends ResourcesParams, ResourceDetailOptions {
  public_id: string;
}

export interface ResourcesByIdsParams extends ResourcesParams {
  public_ids: Array<string>;
}

export interface AccessRequestParams extends ResourcesParams {
  access_mode: "public" | "authenticated";
  public_ids?: Array<string>;
  prefix?: string;
}

export interface AccessRequestBody extends AccessRequestParams {
  resource_tag?: string;
}

/** Optional Request Param Objects */
export interface BaseCloudinaryOptions {
  moderation?: boolean;
  direction?: string | number;
  tags?: boolean;
  context?: boolean;
  prefix?: string;
  public_ids?: Array<string>;
  max_results?: number;
  next_cursor?: string;
  start_at?: string;
}
export interface ResourceDetailOptions extends BaseCloudinaryOptions {
  image_metadata?: boolean;
  exif?: boolean;
  faces?: boolean;
  quality_analysis?: boolean;
  phash?: boolean;
  pages?: boolean;
  derived_next_cursor?: string;
}

export interface UpdateResourceOptions extends ResourceDetailOptions {
  background_removal: string;
  categorization: string;
  raw_convert?: string;
  ocr?: string;
  detection?: string;
  auto_tagging?: number;
  moderation_status?: string;
  quality_override?: string;
  face_coordinates?: string;
  custom_coordinates?: string;
  metadata?: string;
  access_control?: Array<BaseObject>;
}

export interface SearchResourceOptions extends BaseCloudinaryOptions {
}

/**
 * Response Objects
 */

interface DeliveryType {}

export interface ResouceContext {
  custom?: {
    alt: string;
    caption: string;
  };
}

export interface ResourceDerivation {
  transformation: string;
  format: string;
  bytes: number;
  id: string;
  url: string;
  secure_url: string;
}

/**
 * ADMIN - Responses
 */
export interface BaseCloudinaryResponse {
  total_count?: number;
  time?: number;
  aggregations?: Aggregations;
  resources?: Array<SearchResource>;
}

export interface CloudinaryResource {
  public_id: string;
  format: string;
  version?: number;
  resource_type: string;
  delivery_type?: string | DeliveryType;
  created_at: string | Date;
  bytes: number;
  width?: number;
  height?: number;
  backup?: boolean;
  pixels?: number;
  access_mode?: string;
  url: string;
  secure_url: string;
  context?: ResouceContext;
  derived?: Array<ResourceDerivation>;
  colors?: Array<Array<string | number>>;
  faces?: Array<Array<number>>;
  predominant?: object;
}

export interface SearchResource extends CloudinaryResource {
  backup_bytes?: number;
  image_analysis?: CloudinaryImageAnalysis;
  status?: string;
  access_control?: Array<AccessControl>;
  created_by?: {
    [index: string]: any;
  };
  updated_by?: BaseObjectWithValue<string>;
}

export interface CloudinaryResourcesReponse extends BaseCloudinaryResponse {
  resources: Array<CloudinaryResource>;
  next_cursor?: string;
}

export interface CloudinarySearchReponse extends BaseCloudinaryResponse {
  total_count: number;
  time: number;
  resources: Array<SearchResource>;
  next_cursor?: string;
}

export interface ResouceContext {
  custom?: {
    alt: string;
    caption: string;
  };
}

export interface ResourceDerivation {
  transformation: string;
  format: string;
  bytes: number;
  id: string;
  url: string;
  secure_url: string;
}

interface CloudinaryImageAnalysis {
  face_count?: number;
  faces?: Array<object>;
  greyscale?: boolean;
  illustration_score?: number;
  quality_score?: number;
  transparent?: boolean;
  colors: object;
}

/**
   * ADMIN - Errors
   */

export interface BaseCloudinaryError {
  error: {
    message: string;
  };
}

export interface ResourceRequestError extends BaseCloudinaryError {}
export interface SearchRequestError extends BaseCloudinaryError {}

/** POJOs */

/** TYPES */
export type AccessControl = {
  access_type: string;
  start: string;
  end: string;
};

export type AuthHeader = {
  username: string;
  password: string;
};

export type ClientConfig = {
  cloud_name: string | undefined;
  api_key: string | undefined;
  api_secret: string | undefined;
  signature_type: "sha1" | "sha256";
};

type Aggregations = {
  format?: object;
};
