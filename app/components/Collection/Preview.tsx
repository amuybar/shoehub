import React from "react";
import styles from "./Preview.module.css"; 

const Preview: React.FC = () => {
  return (
    <div className={styles.previewContainer}>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <div key={index} className={styles.previewCard}>
            <div className={styles.previewImage}></div>
            <div className={styles.previewText}>
              <div className={styles.previewTitle}></div>
              <div className={styles.previewPrice}></div>
              <div className={styles.previewDescription}></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Preview;
