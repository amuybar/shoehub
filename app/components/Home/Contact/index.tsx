import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import styles from './Contact.module.css';


export function contact() {
  return (
    <section className={styles.contact}>
      <h2>Contact Us</h2>
      <div className={styles.contactInfo}>
        <div>
          <FiPhone /> <span>+254 (74) 812-2483</span>
        </div>
        <div>
          <FiMail /> <span>info@shoehub.com</span>
        </div>
        <div>
          <FiMapPin /> <span>123 Shoe Street, Footwear City, FC 12345</span>
        </div>
      </div>
      <form className={styles.contactForm}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}