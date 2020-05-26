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
  