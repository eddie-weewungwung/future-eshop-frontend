import Image from "next/image";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <section className={styles.landing} aria-label="Landing hero">
      <div className={styles.backgroundWrap}>
        <Image
          src="/images/landing/hero_image.png"
          alt="Future landing hero"
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
        />
      </div>

      <div className={styles.topLeftImageWrap}>
        <Image
          src="/images/landing/image_top_left.png"
          alt=""
          width={260}
          height={390}
          className={styles.floatingImage}
        />
      </div>

      <div className={styles.centerContent}>
        <h1 className={`${styles.title} text-28-36-medium`}>
          built for the ride.
        </h1>

        <a href="/shop" className={`${styles.cta} text-16-20-medium`}>
          shop now
        </a>
      </div>

      <div className={styles.bottomRightImageWrap}>
        <Image
          src="/images/landing/image_bottom_right.png"
          alt=""
          width={320}
          height={213}
          className={styles.floatingImage}
        />
      </div>
    </section>
  );
}