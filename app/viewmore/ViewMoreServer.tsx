// ViewMoreServer.tsx
import { Suspense } from "react";
import ViewMoreClient from "./ViewMoreClient";
import { headers } from "next/headers";

async function getShoes(category: string) {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host") || "";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/shoes?category=${category}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch shoes");
  }
  return response.json();
}

export default async function ViewMoreServer({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const category = searchParams.category || "";
  const { shoes } = await getShoes(category);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewMoreClient initialShoes={shoes} initialCategory={category} />
    </Suspense>
  );
}
