"use client";

import React, { useState, useEffect } from "react";
import { urlFor } from "@/lib/urlFor";
import styles from "./Cart.module.css";
import { FaTrash, FaCreditCard } from "react-icons/fa";
import { toast } from "sonner";
import {
  addToCart,
  getCartItems,
  calculateTotal,
  clearCart,
} from "../../util/cartUtils"; 
import Link from "next/link";

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
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Shoe[]>([]);
  const [casualShoes, setCasualShoes] = useState<Shoe[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    // Load cart items from cartUtils
    setCartItems(getCartItems());

    // Fetch casual shoes
    const fetchCasualShoes = async () => {
      try {
        const response = await fetch("/api/shoes?category=CASUAL"); // Adjust endpoint as needed
        const data = await response.json();
        setCasualShoes(data.shoes);
      } catch (error) {
        console.error("Error fetching casual shoes:", error);
      }
    };

    fetchCasualShoes();
  }, []);

  const handleRemoveItem = (id: string) => {
    // Remove item and update cart
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Cart Updated...");
  };

  const handleClearCart = () => {
    clearCart(); // Use utility function
    setCartItems([]);
    toast.info("Cart Cleared...");
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    toast.success("Proceeding to checkout...");
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    toast.warning(`Updated quantity for ${id}`);
  };

  const filteredShoes = casualShoes.filter((shoe) => {
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
    <div className={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>No items in cart</p>
          <h2>Browse Casual Shoes</h2>
          <div className={styles.casualShoesContainer}>
            {filteredShoes.map((shoe: Shoe) => (
              <div key={shoe.id} className={styles.casualShoeItem}>
                <img
                  src={urlFor(shoe.image)}
                  alt={shoe.title}
                  className={styles.casualShoeImage}
                />
                <h3>{shoe.title}</h3>
                <p>${shoe.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            <h1>Shopping Cart</h1>
            <button onClick={handleClearCart} className={styles.clearButton}>
              <FaTrash /> Clear All
            </button>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={urlFor(item.image)}
                  alt={item.title}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className={styles.quantityContainer}>
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      max={item.items_left}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className={styles.quantityInput}
                    />
                  </div>
                  <p>In Stock: {item.items_left}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.cartTotal}>
              <h2>
                Total: ${calculateTotal(cartItems).toFixed(2)}{" "}
                {/* Use calculateTotal */}
              </h2>
              <div className={styles.cartActions}>
                  <Link
                    href='/checkout'
                  onClick={handleCheckout}
                  className={styles.checkoutButton}
                >
                  <FaCreditCard /> Checkout
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.casualShoesContainer}>
            {filteredShoes.map((shoe: Shoe) => (
              <div key={shoe.id} className={styles.casualShoeItem}>
                <img
                  src={urlFor(shoe.image)}
                  alt={shoe.title}
                  className={styles.casualShoeImage}
                />
                <h3>{shoe.title}</h3>
                <p>${shoe.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
