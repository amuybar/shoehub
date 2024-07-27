"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import { renderCategorySection } from "./Render";
import Hero from "./Hero";
import { contact } from "./Contact";
import { newsletter } from "./Newsletter";

const Home = () => {
  const [shoes, setShoes] = useState<{ [key: string]: any[] }>({
    running: [],
    football: [],
    casual: [],
    formal: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const response = await fetch("/api/shoes");
        const data = await response.json();

        const categories = ["RUNNING", "FOOTBALL", "CASUAL", "FORMAL"];
        const categorizedShoes: { [key: string]: any[] } = {};

        // Initialize categories
        categories.forEach((category) => {
          categorizedShoes[category.toLowerCase()] = [];
        });

        // Categorize shoes
        data.shoes.forEach((shoe: any) => {
          const category = shoe.category.toLowerCase();
          if (categorizedShoes[category]) {
            categorizedShoes[category].push(shoe);
          }
        });

        setShoes(categorizedShoes);
      } catch (error) {
        console.error("Failed to fetch shoes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllShoes();
  }, []);

  return (
    <div className={styles.home}>
      <Hero />
      {renderCategorySection("Running", 4, shoes.running, loading, "Running")}
      {renderCategorySection(
        "Football",
        3,
        shoes.football,
        loading,
        "Football"
      )}
      {renderCategorySection("Casual", 6, shoes.casual, loading, "Casual")}
      {renderCategorySection("Formal", 4, shoes.formal, loading, "Formal")}
      {contact()}
      {newsletter()}
    </div>
  );
};

export default Home;
