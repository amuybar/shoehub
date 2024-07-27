import styles from "./PreviewCard.module.css";

const PreviewCard = () => {
  return (
    <div className={styles.previewCard}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.textPlaceholder}></div>
      <div className={styles.textPlaceholder}></div>
    </div>
  );
};

export default PreviewCard;
