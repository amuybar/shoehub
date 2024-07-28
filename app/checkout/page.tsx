"use client";
import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { CartItem } from "../types";
import { FaCreditCard, FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log("Order submitted", {
      shippingInfo,
      paymentInfo,
      cartItems,
      total,
    });
    toast.success("Order placed successfully!");
    // Clear the cart
    localStorage.setItem("cart", "[]");
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <div className={styles.checkoutContent}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <div className={styles.formSection}>
            <h2>Shipping Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingInfo.fullName}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className={styles.formSection}>
            <h2>Payment Information</h2>
            <div className={styles.cardInputWrapper}>
              <FaCreditCard className={styles.cardIcon} />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className={styles.cardDetails}>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Place Order
          </button>
        </form>
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.orderItem}>
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.totalAmount}>
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
