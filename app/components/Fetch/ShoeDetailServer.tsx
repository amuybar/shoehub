import React from "react";
import { client } from "@/lib/sanity";
import ShoeDetail from "../Details";
import { notFound } from "next/navigation";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Shoe {
  id: string;
  title: string;
  price: number;
  items_left: number;
  gender: string;
  category: string;
  description: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  rating?: number;
  reviews?: Review[];
}

const ShoeDetailServer = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  try {
    // Fetch the shoe detail
    const query = `*[_type == "shoe" && slug.current == $slug][0]`;
    const shoe: Shoe = await client.fetch(query, { slug });

    if (!shoe) {
      return notFound();
    }

    // Fetch shoes in the same category with filters for name, price, and image
    const categoryQuery = `*[_type == "shoe" && category == $category && slug.current != $slug && defined(title) && defined(price) && defined(image.asset._ref) && image.asset._ref != "untitled"]`;
    const relatedShoes: Shoe[] = await client.fetch(categoryQuery, {
      category: shoe.category,
      slug: shoe.slug.current,
    });

    return <ShoeDetail shoe={shoe} relatedShoes={relatedShoes} />;
  } catch (error) {
    console.error("Error fetching shoe detail:", error);
    return notFound();
  }
};

export default ShoeDetailServer;
