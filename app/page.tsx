'use client'
import { useState } from 'react'
import styles from "./page.module.css";
import Navbar from "./components/nav";
import HeroSection from './components/Hero';

export default function Home() {
  // Define state for selected link
  const [selectedLink, setSelectedItem] = useState("/");

  // Render the home page content

  return (
    <main className={styles.main}>
      <Navbar selectedLink={selectedLink} setSelectedItem={setSelectedItem} />
      <HeroSection selectedItem={selectedLink} /> 
    </main>
  );
}
