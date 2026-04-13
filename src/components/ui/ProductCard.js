import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

export default function ProductCard({
  name,
  category,
  isOnSale,
  sale_price,
  original_price,
  images,
  hoverImage,
  sizes,
  href,
}) {
  const primaryImage = images?.[0]?.src || "";
  const hasPrimaryImage = Boolean(primaryImage);
  const hasHoverImage = Boolean(hoverImage);
  const secondaryImage = hasHoverImage ? hoverImage : primaryImage;

  const displayPrice = isOnSale && sale_price ? sale_price : original_price;
  const discountPercent =
    isOnSale && original_price
      ? Math.round(((original_price - sale_price) / original_price) * 100)
      : null;

  return (
    <article
      className={`${styles.card} ${hasHoverImage ? styles.hasHoverImage : ""} ${
        isOnSale ? styles.isOnSale : ""
      }`}
    >
      <Link href={href} className={styles.cardLink} aria-label={name}>
        {isOnSale && discountPercent && (
          <div className={styles.saleTag}>{discountPercent}% off</div>
        )}

        <div className={styles.imageWrap}>
          {hasPrimaryImage && (
            <>
              <Image
                src={primaryImage}
                alt={name}
                width={600}
                height={600}
                className={`${styles.image} ${styles.imagePrimary}`}
              />

              {secondaryImage && (
                <Image
                  src={secondaryImage}
                  alt=""
                  aria-hidden="true"
                  width={600}
                  height={600}
                  className={`${styles.image} ${styles.imageHover}`}
                />
              )}
            </>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.metaRow}>
            <h3 className={styles.name}>{name}</h3>

            {isOnSale && sale_price ? (
              <div className={styles.priceGroup}>
                <p className={`${styles.price} ${styles.originalPrice}`}>
                  {formatPrice(original_price)}
                </p>
                <p className={`${styles.price} ${styles.salePrice}`}>
                  {formatPrice(sale_price)}
                </p>
              </div>
            ) : (
              <p className={styles.price}>{formatPrice(displayPrice)}</p>
            )}
          </div>

          {sizes.length > 0 && (
            <div className={styles.sizes} aria-label="Available sizes">
              {sizes.map((size, index) => (
                <span
                  key={`${name}-${size}-${index}`}
                  className={styles.sizeItem}
                >
                  <span className={styles.sizeText}>{size}</span>
                  {index < sizes.length - 1 && (
                    <span className={styles.separator} aria-hidden="true">
                      {" "}
                      /{" "}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
