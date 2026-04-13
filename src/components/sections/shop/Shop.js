"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import ShopFilter from "@/components/ui/ShopFilter";
import styles from "./Shop.module.css";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.247:3000";
        const response = await fetch(`${apiUrl}/api/products?category=22`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className={styles.shop} id="shop" aria-label="Shop">
      <ShopFilter />

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.categories}
            isOnSale={Boolean(product.sale_price)}
            sale_price={product.sale_price}
            original_price={product.regular_price || product.price}
            images={product.images}
            hoverImage={product.hover_image_url}
            sizes={
              product.attributes.find((attr) => attr.name === "size")
                ?.options || []
            }
            href={`/product/${product.slug}`}

            // slug={product.slug}
          />
        ))}
      </div>
    </section>
  );
}
