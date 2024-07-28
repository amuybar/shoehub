import { CartItem } from "@/app/types";
import renderProducts from "../Product";
import styles from "./Render.module.css";
import { useRouter } from "next/navigation";

interface RenderProductsProps {
  products: CartItem[];
}

export function RenderCategorySection(
  title: string,
  num: number,
  products: CartItem[],
  loading: boolean,
  category: string
) {
  const router = useRouter();

  // Navigate to view more with category in URL
  const handleViewMore = () => {
    router.push(`/viewmore?category=${category}`);
  };

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {renderProducts({ products, num, loading })}
      <button onClick={handleViewMore} className={styles.viewMoreButton}>
        View More
      </button>
    </section>
  );
}
