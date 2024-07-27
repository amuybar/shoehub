import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { getCartItemCount } from "@/app/util/cartUtils";

export default function Navbar({
  selectedLink,
  setSelectedItem,
}: {
  selectedLink: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
   const [cartItemCount, setCartItemCount] = useState(0);

   useEffect(() => {
     // Update cart item count whenever component mounts or cart is updated
     setCartItemCount(getCartItemCount());
   }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={100}
          height={50}
          priority
        />
      </Link>
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? <FiMenu size={30} /> : <AiFillCloseCircle size={35} />}
      </div>
      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {["/", "/men", "/women", "/kids", "/collection", "/contact"].map(
          (path, index) => (
            <li
              key={path}
              className={selectedLink === path ? styles.active : ""}
              onClick={() => {
                setSelectedItem(path);
                setMenuOpen(false);
              }}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <a className={styles.link}>
                {path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </a>
            </li>
          )
        )}
      </ul>
      <div className={styles.lastdivs}>
        <div className={styles.cart} onClick={() => setSelectedItem("/cart")}>
          <FiShoppingCart size={25} />
          <span className={styles.cartCount}>{cartItemCount}</span>
        </div>
      </div>
    </nav>
  );
}
