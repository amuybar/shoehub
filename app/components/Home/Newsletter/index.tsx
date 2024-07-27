import { FiSend } from "react-icons/fi";
import styles from './NewsLetter.module.css';

export function newsletter() {
    return (
      <section className={styles.newsletter}>
        <h2>Subscribe to our Newsletter</h2>
        <p>Stay updated with our latest offers and new arrivals!</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">
            <FiSend size={30} />
          </button>
        </form>
      </section>
    );
  }