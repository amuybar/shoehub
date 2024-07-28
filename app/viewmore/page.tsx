import React, { useState } from "react";
import styles from "./ViewMore.module.css";
import { CartItem } from "../types";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/LoadingSpinner";
import renderProducts from "../components/Home/Product";
import Navbar from "../components/nav";

const HeroSection = dynamic(() => import("../components/Hero"), { ssr: false });

const ViewMore: React.FC<{ shoes: CartItem[]; category: string }> = ({
  shoes,
  category,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedItem] = useState<string>("/");

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

export async function getServerSideProps(context) {
  const category = context.query.category || "";
  let shoes: CartItem[] = [];

  try {
    const response = await fetch(
      `https://api.example.com/shoes?category=${category}`
    );
    const data = await response.json();
    shoes = data.shoes || [];
  } catch (error) {
    console.error("Error fetching shoes:", error);
  }

  return {
    props: {
      shoes,
      category,
    },
  };
}

export default ViewMore;
