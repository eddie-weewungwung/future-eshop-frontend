import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import ProductCard from "@/components/ui/ProductCard";
import SizeChart from "@/components/ui/SizeChart";
import styles from "./page.module.css";

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

// function getRelatedProducts(currentProduct) {
//   return products
//     .filter((product) => product.slug !== currentProduct.slug)
//     .slice(0, 4);
// }

async function fetchProductBySlug(slug) {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.247:3000";
    const response = await fetch(`${apiUrl}/api/products/${slug}`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  const name = product.name;
  const sale_price = product.sale_price;
  const isOnSale = Boolean(product.sale_price);
  const sizes =
    product.attributes.find((attr) => attr.name === "size")?.options || [];
  const images = product.images;
  const original_price = product.regular_price || product.price;
  const description = product.description;
  const sizeChart = "";

  if (!product) {
    notFound();
  }

  // const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <Header />

      <main className={styles.page}>
        <section className={styles.productSection}>
          <div className={styles.detailLayout}>
            <aside className={styles.contentColumn}>
              <div className={styles.stickyContent}>
                <Link href="/#shop" className={styles.backLink}>
                  back
                </Link>
                <div className={styles.titleBlock}>
                  <h1 className={`${styles.title} text-16-20-medium`}>
                    {name}
                  </h1>

                  {isOnSale && salePrice ? (
                    <div className={styles.priceGroup}>
                      <p
                        className={`${styles.price} ${styles.salePrice} text-16-20-medium`}
                      >
                        {formatPrice(sale_price)}
                      </p>
                      <p
                        className={`${styles.price} ${styles.originalPrice} text-16-20-medium`}
                      >
                        {formatPrice(original_price)}
                      </p>
                    </div>
                  ) : (
                    <p className={`${styles.price} text-16-20-medium`}>
                      {formatPrice(original_price)}
                    </p>
                  )}
                </div>

                <div className={styles.purchaseBlock}>
                  <div className={styles.optionsRow}>
                    <div className={styles.sizeOptions}>
                      {sizes.map((size, index) => (
                        <button
                          key={`${slug}-${size}-${index}`}
                          type="button"
                          className={`${styles.sizeButton} ${
                            index === 1 ? styles.sizeButtonActive : ""
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <div className={styles.quantityBox}>
                      <span className={styles.quantityLabel}>quantity:</span>
                      <div className={styles.quantityControls}>
                        <button type="button" className={styles.qtyButton}>
                          -
                        </button>
                        <span className={styles.qtyValue}>1</span>
                        <button type="button" className={styles.qtyButton}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button type="button" className={styles.addToCartButton}>
                    add to cart
                  </button>
                </div>

                <div className={styles.detailsBlock}>
                  <p className={styles.blockTitle}>product details</p>
                  <ul className={styles.detailList}>{description}</ul>
                </div>

                {sizeChart && <SizeChart sizeChart={sizeChart} />}
              </div>
            </aside>

            <div className={styles.imageColumn}>
              <div className={styles.mobileImageSlider}>
                <div className={styles.mobileImageTrack}>
                  {images.map((image, index) => (
                    <div key={image.id} className={styles.mobileImageFrame}>
                      <Image
                        src={image.src}
                        alt={`${name} image ${index + 1}`}
                        width={1200}
                        height={1200}
                        className={styles.mobileImage}
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.mobileSliderControls}>
                  <button type="button" className={styles.mobileArrow}>
                    &lt;
                  </button>
                  <button type="button" className={styles.mobileArrow}>
                    &gt;
                  </button>
                </div>
              </div>

              <div className={styles.desktopImageStack}>
                {images.map((image, index) => (
                  <Image
                    key={image.id}
                    src={image.src}
                    alt={`${name} image ${index + 1}`}
                    width={1600}
                    height={1600}
                    className={styles.desktopDetailImage}
                    sizes="(min-width: 992px) 58vw, 100vw"
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.relatedSection}
          aria-label="You may also like"
        >
          <p className={styles.relatedTitle}>you may also like</p>

          {/* <div className={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                name={relatedProduct.name}
                category={relatedProduct.category}
                isOnSale={relatedProduct.isOnSale}
                originalPrice={relatedProduct.originalPrice}
                salePrice={relatedProduct.salePrice}
                primaryImage={relatedProduct.primaryImage}
                hoverImage={relatedProduct.hoverImage}
                imageAlt={relatedProduct.imageAlt}
                sizes={relatedProduct.sizes}
                href={relatedProduct.href}
              />
            ))}
          </div> */}
        </section>
      </main>
    </>
  );
}
