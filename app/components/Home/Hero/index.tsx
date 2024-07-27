import React from "react";
import Search from "../../Search";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  const handleSearch = (query: string) => {
    // Logic to handle search query
    console.log("Searching for:", query);
    // For example, you could update a global state or redirect to a search results page
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Welcome to ShoeHub</h1>
        <p>
          Your ultimate destination for the latest and greatest in footwear.
        </p>
      </div>
      <Search onSearch={handleSearch} />
    </section>
  );
};

export default Hero;
