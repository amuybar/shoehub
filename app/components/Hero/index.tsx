'use client'
import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";

// Import all the components
import Home from "../Home";
import Men from "../Men";
import Women from "../Women";
import Kids from "../Kids";
import Collection from "../Collection";
import Contact from "../Contact";
import Cart from "../Cart";

// Create a dictionary to map selectedItem to components
const componentMap: { [key: string]: React.ComponentType } = {
  "/": Home,
  "/men": Men,
  "/women": Women,
  "/kids": Kids,
  "/collection": Collection,
  "/contact": Contact,
  "/cart": Cart,
  
};

export default function HeroSection({
  selectedItem,
}: {
  selectedItem: string;
}) {
  const [key, setKey] = useState(0);

 
  const Component = componentMap[selectedItem] || Home;

  return (
    <div className={styles.hero}>
      <div className={styles.componentWrapper}>
          <Component key={key} />
        </div>
    </div>
  );
}
