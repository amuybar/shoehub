
"use client";

import React, { useState, useEffect } from "react";
import styles from "./ViewMore.module.css";
import { CartItem } from "../types";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import renderProducts from "../components/Home/Product";
import Navbar from "../components/nav";
import HeroSection from "../components/Hero";

interface ViewMoreClientProps {
  initialShoes: CartItem[];
  initialCategory: string;
}

const ViewMoreClient: React.FC<ViewMoreClientProps> = ({
  initialShoes,
  initialCategory,
}) => {
  const [shoes, setShoes] = useState<CartItem[]>(initialShoes);
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedItem] = useState<string>("/");
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || initialCategory;

  useEffect(() => {
    if (category !== initialCategory) {
      setLoading(true);
      const fetchShoes = async () => {
        try {
          const response = await fetch(`/api/shoes?category=${category}`);
          const data = await response.json();
          setShoes(data.shoes);
        } catch (error) {
          console.error("Error fetching shoes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchShoes();
    }
  }, [category, initialCategory]);

  useEffect(() => {
    if (selectedLink !== "/" && !category) {
      // If a link is selected and no category is set, show HeroSection
      // You may also want to handle specific logic based on the selectedLink here
    }
  }, [selectedLink, category]);

  return (
    <div className={styles.container}>
      <Navbar selectedLink={selectedLink} setSelectedItem={setSelectedItem} />

      {selectedLink !== "/" ? (
        <HeroSection selectedItem={selectedLink} />
      ) : (
        <div>
          <h1>{category ? `${category} Shoes` : "All Shoes"}</h1>
          {loading ? (
            <LoadingSpinner />
          ) : shoes.length > 0 ? (
            renderProducts({
              products: shoes,
              num: shoes.length,
              loading: false,
            })
          ) : (
            <p>No shoes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMoreClient;
