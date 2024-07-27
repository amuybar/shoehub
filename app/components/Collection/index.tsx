"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Collection.module.css";
import { urlFor } from "@/lib/urlFor";
import Preview from "./Preview";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "sonner";

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
}

const Collection: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch("/api/shoes");
        const data = await response.json();
        setShoes(data.shoes);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleShoeClick = async (slug: string) => {
    setDetailLoading(true);
    try {
      await router.push(`/details/${slug}`);
    } catch (error) {
      console.error("Error navigating to shoe details:", error);
      toast.error("Failed to load shoe details. Please try again.");
    } finally {
      setDetailLoading(false);
    }
  };

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
      <div className={styles.filters}>
        <h2>Filters</h2>
        <label>
          Category:
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="FORMAL">Formal</option>
            <option value="CASUAL">Casual</option>
            {/* Add more categories if needed */}
          </select>
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">All Genders</option>
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </label>
        <label>
          Price (max):
          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            min="0"
          />
        </label>
        <label>
          Stock:
          <select
            name="stock"
            value={filters.stock}
            onChange={handleFilterChange}
          >
            <option value="">All Stock</option>
            <option value="1">In Stock</option>
            <option value="0">Out of Stock</option>
          </select>
        </label>
      </div>

      <div className={styles.collection}>
        <h2>Our Collection</h2>
        <div className={styles.shoeList}>
          {loading ? (
            <Preview /> // Show preview cards while loading
          ) : filteredShoes.length > 0 ? (
            filteredShoes.map((shoe) => {
              const imageUrl = shoe.image?.asset
                ? urlFor(shoe.image)
                : "/default-image.jpg";
              return (
                <div key={shoe.id} className={styles.shoeItem}>
                  <a onClick={() => handleShoeClick(shoe.slug.current)}>
                    <img
                      src={imageUrl}
                      alt={shoe.title}
                      className={styles.shoeImage}
                    />
                    <h3>{shoe.title}</h3>
                    <p>Price: ${shoe.price}</p>
                  </a>
                </div>
              );
            })
          ) : (
            <p>No shoes found.</p>
          )}
        </div>
      </div>

      {detailLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Collection;
