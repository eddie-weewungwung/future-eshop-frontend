"use client";

import { useState } from "react";
import styles from "./SizeChart.module.css";

export default function SizeChart({ sizeChart }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sizeChart) return null;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles.sizeChartBlock} ${isOpen ? styles.blockOpen : ""}`}
    >
      <button
        type="button"
        className={styles.sizeChartButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.sizeChartTitle}>{sizeChart.label}</span>
        <span className={styles.sizeChartSymbol}>{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`${styles.sizeChartPanel} ${isOpen ? styles.isOpen : ""}`}
      >
        {sizeChart.type === "table" && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {sizeChart.columns.map((column) => (
                    <th key={column} className={styles.th}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sizeChart.rows.map((row, rowIndex) => (
                  <tr key={`${sizeChart.label}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={styles.td}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
