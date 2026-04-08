import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getDiscountPercent(originalPrice, salePrice) {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export default function ProductCard({
  name,
  category,
  isOnSale = false,
  originalPrice,
  salePrice,
  primaryImage,
  hoverImage,
  imageAlt,
  sizes = [],
  href = "/shop",
}) {
  const hasPrimaryImage = Boolean(primaryImage);
  const hasHoverImage = Boolean(hoverImage);
  const secondaryImage = hasHoverImage ? hoverImage : primaryImage;
  const displayPrice = isOnSale && salePrice ? salePrice : originalPrice;
  const discountPercent =
    isOnSale && salePrice ? getDiscountPercent(originalPrice, salePrice) : null;

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
                alt={imageAlt || name}
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

            {isOnSale && salePrice ? (
              <div className={styles.priceGroup}>
                <p className={`${styles.price} ${styles.originalPrice}`}>
                  {formatPrice(originalPrice)}
                </p>
                <p className={`${styles.price} ${styles.salePrice}`}>
                  {formatPrice(salePrice)}
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
