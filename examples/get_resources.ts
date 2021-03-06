import { Client } from "../mod.ts";

const cloud = new Client({
  cloud_name: Deno.env.get("CLOUDINARY_CLOUD_NAME"),
  api_key: Deno.env.get("CLOUDINARY_API_KEY"),
  api_secret: Deno.env.get("CLOUDINARY_API_SECRET"),
  signature_type: "sha1",
});

let data = await cloud.resources({
  resource_type: "image",
});

console.log(data);
