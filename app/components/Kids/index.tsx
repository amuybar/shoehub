"use client";

import React, { useState, useEffect } from "react";
import styles from "./Collection.module.css";
import Preview from "../Collection/Preview";
import renderProducts from "../Home/Product";
import LoadingSpinner from "../LoadingSpinner";
import { CartItem } from "@/app/types";

const Men: React.FC = () => {
  const [shoes, setShoes] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch("/api/shoes");
        const data = await response.json();
        const kidsShoes = data.shoes.filter(
          (shoe: Shoe) => shoe.gender === "KIDS"
        );
        setShoes(kidsShoes);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  // Filter shoes based on filters
  const filteredShoes = shoes.filter((shoe) => {
    const hasImage = shoe.image?.asset?._ref; // Check if image reference exists
    return (
      hasImage && // Ensure shoe has an image
      (filters.category ? shoe.category === filters.category : true) &&
      (filters.gender ? shoe.gender === filters.gender : true) &&
      (filters.price ? shoe.price <= parseFloat(filters.price) : true) &&
      (filters.stock ? shoe.items_left.toString() === filters.stock : true)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.collection}>
        <h2>Kid&#39;s Collection</h2>
        {loading ? (
          <Preview />
        ) : (
          renderProducts({
            products: filteredShoes,
            num: filteredShoes.length,
            loading: false,
          })
        )}
      </div>

      {detailLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Men;
