import ProductCard from "@/components/ui/ProductCard";
import ShopFilter from "@/components/ui/ShopFilter";
import products from "@/data/products";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <section className={styles.shop} id="shop" aria-label="Shop">
      <ShopFilter />

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.category}
            isOnSale={product.isOnSale}
            originalPrice={product.originalPrice}
            salePrice={product.salePrice}
            primaryImage={product.primaryImage}
            hoverImage={product.hoverImage}
            imageAlt={product.imageAlt}
            sizes={product.sizes}
            href={product.href}
          />
        ))}
      </div>
    </section>
  );
}
