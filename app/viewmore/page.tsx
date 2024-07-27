"use client";

import React, { useState, useEffect } from "react";
import styles from "./ViewMore.module.css";
import { CartItem } from "../types";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import renderProducts from "../components/Home/Product";
import Navbar from "../components/nav";
import HeroSection from "../components/Hero";

const ViewMore: React.FC = () => {
  const [shoes, setShoes] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedItem] = useState<string>("/");
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    // Fetch shoes based on the category
    const fetchShoes = async () => {
      try {
        const response = await fetch(`/api/shoes?category=${category}`); // Adjust endpoint
        const data = await response.json();
        setShoes(data.shoes);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, [category]);

  useEffect(() => {
    // This effect handles the change in selected link
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

export default ViewMore;
