import { createClient } from "@sanity/client";
require("dotenv").config();

export const client = createClient({
  projectId: process.env.PROJECT_ID || "b7k3bebw",
  dataset: "production",
  apiVersion: "2024-07-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  
});


export async function fetchShoesByCategory(category: string) {
  const query = `*[_type == "shoe" && category == $category]`;
  const params = { category };
  const results = await client.fetch(query, params);

  console.log("Fetched shoes:", results); 

  return results;
}


