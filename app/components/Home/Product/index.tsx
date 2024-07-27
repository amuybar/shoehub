import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/urlFor";
import styles from "./Card.module.css";
import PreviewCard from "./PreviewCard";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "sonner";
import { addToCart } from "@/app/util/cartUtils";
import { CartItem } from "@/app/types";



interface RenderProductsProps {
  products: CartItem[];
  num: number;
  loading: boolean;
}

function RenderProducts({
  products = [],
  num = 0,
  loading,
}: RenderProductsProps) {
  // Ensure products is an array
  if (!Array.isArray(products)) {
    console.error("Expected 'products' to be an array");
    return null; // Optionally return null or a fallback UI
  }

  if (loading) {
    // Render preview cards if loading
    return (
      <div className={styles.productContainer}>
        {Array.from({ length: num }).map((_, index) => (
          <PreviewCard key={index} />
        ))}
      </div>
    );
  }

  // Filter out products without a title
  const filteredProducts = products.filter(
    (shoe) => shoe.title && shoe.title.trim() !== ""
  );

  // Limit the number of products to display based on the 'num' prop
  const productsToDisplay = filteredProducts.slice(
    0,
    num || filteredProducts.length
  );

  return (
    <div className={styles.productContainer}>
      {productsToDisplay.map((shoe) => {
        // Determine the URL for the image
        const imageUrl = shoe.image?.asset
          ? urlFor(shoe.image)
          : "/default-image.jpg";

        // Ensure title and price are present and formatted
        const title = shoe.title || "Untitled";
        const price = shoe.price
          ? `$${shoe.price.toFixed(2)}`
          : "Price Unavailable";

        return (
          <div key={shoe.id} className={styles.product}>
            <Link href={`/details/${shoe.slug.current}`}>
              <Image
                src={imageUrl}
                alt={title}
                width={150}
                height={150}
                // Ensure aspect ratio is maintained
                style={{ objectFit: "cover" }}
              />
              <h3>{title}</h3>
              <p>{price}</p>
            </Link>
            <button
                onClick={() => {
                addToCart({ ...shoe, quantity: 1 } as CartItem); 
                toast.info("Successfully Added to Cart...");
              }}
              className={styles.cartButton}
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RenderProducts;
