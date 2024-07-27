
'use client'
import React from "react";
import { urlFor } from "@/lib/urlFor";
import styles from "../../details/[slug]/ShoeDetail.module.css";
import { FaCartPlus, FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";

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

interface ShoeDetailProps {
  shoe: Shoe;
  relatedShoes: Shoe[];
}

const ShoeDetail: React.FC<ShoeDetailProps> = ({ shoe, relatedShoes }) => {
  const imageUrl = shoe.image?.asset
    ? urlFor(shoe.image)
    : "/default-image.jpg";
  // Add to cart
  const handleAddToCart = (shoe: Shoe) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(shoe);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    toast.info("Succesfully Added to Cart...");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <a href="/" className={styles.backButton}>
          <FaArrowLeft /> Back
        </a>
        <span className={styles.path}>
          Home / {shoe.category} / {shoe.title}
        </span>
      </div>
      <div className={styles.title}>
        <h1>{shoe.title}</h1>
      </div>
      <div className={styles.detail}>
        <img src={imageUrl} alt={shoe.title} className={styles.shoeImage} />
        <div className={styles.info}>
          <h1>{shoe.title}</h1>
          <p className={styles.price}>Price: ${shoe.price}</p>
          <p>Category: {shoe.category}</p>
          <p>Stock: {shoe.items_left > 0 ? "In Stock" : "Out of Stock"}</p>
          <p>Gender: {shoe.gender}</p>
          <p>Description: {shoe.description}</p>
          <div className={styles.rating}>
            <span>Rating: {shoe.rating ? shoe.rating : "No rating"} / 5</span>
          </div>
          <button
            onClick={() => handleAddToCart(shoe)}
            className={styles.cartButton}
          >
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>

      <div className={styles.relatedShoes}>
        <h2>Related Shoes</h2>
        <div className={styles.relatedShoesList}>
          {relatedShoes.length > 0 ? (
            relatedShoes.map((relatedShoe: Shoe) => {
              const relatedImageUrl = relatedShoe.image?.asset
                ? urlFor(relatedShoe.image)
                : "/default-image.jpg";
              return (
                <div key={relatedShoe.id} className={styles.relatedShoeItem}>
                  <a
                    href={`/details/${relatedShoe.slug.current}`}
                    className={styles.relatedShoeLink}
                  >
                    <img
                      src={relatedImageUrl}
                      alt={relatedShoe.title}
                      className={styles.relatedShoeImage}
                    />
                    <h3>{relatedShoe.title}</h3>
                    <p>${relatedShoe.price}</p>
                    <p>{relatedShoe.description}</p>
                  </a>
                </div>
              );
            })
          ) : (
            <p>No related shoes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoeDetail;
