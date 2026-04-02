import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.leftNav} aria-label="Primary navigation">
          <Link href="/shop" className={`${styles.navLink} text-16-20-medium`}>
            shop
          </Link>
          <Link href="/about" className={`${styles.navLink} text-16-20-medium`}>
            about
          </Link>
        </nav>

        <Link href="/" className={styles.logoLink} aria-label="Future home">
          <Image
            src="/assets/logos/future_horizontal_black.png"
            alt="Future"
            width={152}
            height={30}
            className={styles.logo}
            priority
          />
        </Link>

        <Link href="/cart" className={`${styles.cartLink} text-16-20-medium`}>
          cart (2)
        </Link>
      </div>
    </header>
  );
}
