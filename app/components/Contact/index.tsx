"use client";
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./Contact.module.css";
import { toast } from "sonner";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

// Ensure the environment variable is loaded
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error(
    "Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local"
  );
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("This is a success toast");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("This is an error toast");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.aboutHeading}>About Us</h1>
        <p className={styles.aboutParagraph}>
          Welcome to Shoehub, your number one source for all things shoes. We're
          dedicated to giving you the very best of shoes, with a focus on
          dependability, customer service, and uniqueness.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
        <h3 className={styles.faqQuestion}>What is Shoehub?</h3>
        <p className={styles.faqAnswer}>
          Shoehub is a premier destination for shoe lovers, offering a wide
          range of shoes from various brands.
        </p>
        <h3 className={styles.faqQuestion}>How can I contact Shoehub?</h3>
        <p className={styles.faqAnswer}>
          You can contact us through the contact form below or via email at
          support@shoehub.com.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.mapHeading}>Contact Us</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name:</label>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email:</label>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Message:</label>
            <textarea
              className={styles.formTextarea}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.formButton} type="submit">
            Send
          </button>
        </form>
      </section>

      <section className={styles.mapSection}>
        <h2 className={styles.mapHeading}>Our Location</h2>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </section>
    </div>
  );
};

export default Contact;
