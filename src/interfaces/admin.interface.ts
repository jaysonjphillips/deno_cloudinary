import { BaseAPIResponseData } from "./base.interface.ts";

export interface IAdminAPI {
  getResources: Function;
  getResourcesByTag: Function;
  getResourcesByContext: Function;
  getResourcesByModerationStatus: Function;
  getResourceByPublicId: Function;
  getResourcesByPublicIds: Function;
  updateResourceAccess: Function;
  deleteResources: Function;
}

export interface AdminResourcesResponse extends BaseAPIResponseData {
  resources: Array<AdminResource>;
  next_cursor?: string;
}

export interface BaseParameterObject {
    [index: string]: any;
}

interface AdminOptionalParameters extends BaseParameterObject {
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

interface OptionalResourceDetailsParameters extends AdminOptionalParameters {
    image_metadata?: boolean;
    exif?: boolean;
    faces?: boolean;
    quality_analysis?: boolean;
    phash?: boolean;
    pages?: boolean;
    derived_next_cursor?: string;
}

export interface OptionalResourceUpdateDetailsParams extends OptionalResourceDetailsParameters {
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
    access_control: Array<object>;
}

export interface AdminResourceParameters extends AdminOptionalParameters {
  resource_type: "image" | "raw" | "video" | "auto";
  delivery_type?: string;
  public_id?: string;
  resource_tag?: string;
}

export interface GetResourcesByTagParameters extends AdminResourceParameters {
  tag: string;
}

export interface GetResourcesByContextParameters
  extends AdminResourceParameters {
  key: string;
}

export interface ModerationStatusParameters {
    moderation_kind: 'metascan' | 'aws_rek' | 'webpurify' | 'manual';
    status: 'pending' | 'approved' | 'rejected';
}

export interface ResourceDetailsParameters extends AdminResourceParameters, OptionalResourceDetailsParameters {
    public_id: string;
}

export interface OptionalSearchParameters extends AdminOptionalParameters {
    
}

export interface AdminResourcePublicIds extends AdminResourceParameters {
  public_ids?: Array<string>;
}

export interface AdminModerationParameters extends AdminResourceParameters {
  moderation_kind?: "metascan" | "aws_rek" | "manual" | "webpurify";
  moderation_status?: "pending" | "approved" | "rejected";
}

export interface AdminAccessParameters extends AdminResourceParameters {
  access_mode: "public" | "authenticated";
  public_ids?: Array<string>;
  prefix?: string;
}

export interface AdminAccessRequestBody {
  access_mode: "public" | "authenticated";
  public_ids?: Array<string>;
  prefix?: string;
  tag?: string;
}

export interface AdminResource {
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

export type AccessControl = {
  access_type: string;
  start: string;
  end: string;
};

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

export interface AdminResouceRequestParameters {
  resource_type: string;
}

// TODO: More robust typing on access response
export interface AdminAccessResponse extends BaseAPIResponseData {
  updated: object;
  failed: object;
}

export interface DeleteResourcesParameters extends AdminResourceParameters {
  public_ids?: Array<string>;
  prefix?: string;
  tag?: string;
  keep_original?: boolean;
  invalidate?: boolean;
  next_cursor?: string;
  transformations?: string;
}

export type DeleteRequestBody = {
  public_ids?: Array<string>;
  prefix?: string;
  tag?: string;
  keep_original?: boolean;
  invalidate?: boolean;
  next_cursor?: string;
  transformations?: string;
};

export interface DeleteResourcesResponse extends BaseAPIResponseData {
  deleted: object;
  partial: boolean;
}

export interface SearchParameters {
  expression?: string;
  sort_by?: Array<string>;
  max_results?: number;
  next_cursor?: string;
  with_field?: string;
  aggregate?: string;
}

export interface SearchResponse extends BaseAPIResponseData {
  total_count: number;
  time: number;
  aggregations: Aggregations;
  resources?: Array<SearchResult>;
}

export interface SearchResult extends AdminResource {
  backup_bytes?: number;
  image_analysis?: ImageAnalysis;
  status?: string;
  access_control?: Array<AccessControl>;
  created_by?: {
    [index: string]: string;
  };
  updated_by?: {
    [index: string]: string;
  };
}

interface ImageAnalysis {
  face_count?: number;
  faces?: Array<object>;
  greyscale?: boolean;
  illustration_score?: number;
  quality_score?: number;
  transparent?: boolean;
  colors: object;
}

type Aggregations = {
  format?: object;
};
