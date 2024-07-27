import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity"; 


const builder = imageUrlBuilder(client);

export function urlFor(source:any) {
  if (!source) {
    console.warn("No image source provided");
    return "/assets/default-image.png"; 
  }

  if (typeof source === "string") {
    return source;
  }

  try {
    return builder.image(source).url();
  } catch (error) {
    console.error("Error generating image URL:", error);
    return "/assets/default-image.png"; 
  }
}

