import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    // Check if the data is cached in local storage
    const cachedShoes =
      typeof window !== "undefined" ? localStorage.getItem("shoes") : null;

    if (cachedShoes) {
      return NextResponse.json({ shoes: JSON.parse(cachedShoes) });
    }

    // Fetch from Sanity if not cached
    const query = '*[_type == "shoe"]';
    const shoes = await client.fetch(query);

    // Cache the fetched data
    if (typeof window !== "undefined") {
      localStorage.setItem("shoes", JSON.stringify(shoes));
    }

    return NextResponse.json({ shoes });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
