import styles from "./ShopFilter.module.css";

const FILTER_OPTIONS = [
  { label: "all", value: "all" },
  { label: "t-shirts", value: "tee" },
  { label: "decks", value: "deck" },
  { label: "wheels", value: "wheels" },
  { label: "bearings", value: "bearings" },
];

export default function ShopFilter({
  activeCategory = "all",
  onCategoryChange,
}) {
  return (
    <div className={styles.filterRow} aria-label="Shop categories">
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeCategory === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.tag} ${isActive ? styles.isActive : ""}`}
            // onClick={() => onCategoryChange?.(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
