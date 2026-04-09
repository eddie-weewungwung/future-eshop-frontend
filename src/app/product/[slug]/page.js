import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import ProductCard from "@/components/ui/ProductCard";
import SizeChart from "@/components/ui/SizeChart";
import products, { getProductBySlug } from "@/data/products";
import styles from "./page.module.css";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getRelatedProducts(currentProduct) {
  return products
    .filter((product) => product.slug !== currentProduct.slug)
    .slice(0, 4);
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

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
                    {product.name}
                  </h1>

                  {product.isOnSale && product.salePrice ? (
                    <div className={styles.priceGroup}>
                      <p
                        className={`${styles.price} ${styles.salePrice} text-16-20-medium`}
                      >
                        {formatPrice(product.salePrice)}
                      </p>
                      <p
                        className={`${styles.price} ${styles.originalPrice} text-16-20-medium`}
                      >
                        {formatPrice(product.originalPrice)}
                      </p>
                    </div>
                  ) : (
                    <p className={`${styles.price} text-16-20-medium`}>
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>

                <div className={styles.purchaseBlock}>
                  <div className={styles.optionsRow}>
                    <div className={styles.sizeOptions}>
                      {product.sizes.map((size, index) => (
                        <button
                          key={`${product.slug}-${size}-${index}`}
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
                  <ul className={styles.detailList}>
                    {product.descriptionItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                {product.sizeChart && (
                  <SizeChart sizeChart={product.sizeChart} />
                )}
              </div>
            </aside>

            <div className={styles.imageColumn}>
              <div className={styles.mobileImageSlider}>
                <div className={styles.mobileImageTrack}>
                  {product.detailImages.map((image, index) => (
                    <div key={image} className={styles.mobileImageFrame}>
                      <Image
                        src={image}
                        alt={`${product.name} image ${index + 1}`}
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
                {product.detailImages.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
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

          <div className={styles.relatedGrid}>
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
          </div>
        </section>
      </main>
    </>
  );
}
