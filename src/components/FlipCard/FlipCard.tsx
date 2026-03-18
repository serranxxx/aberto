"use client";

import { useState } from "react";
import styles from "./FlipCard.module.css";

type FlipCardProps = {
  width?: number | string;
  height?: number | string;
  frontColor?: string;
  backColor?: string;
  className?: string;
  onCard: boolean
};

export default function FlipCard({
  width = 280,
  height = 420,
  frontColor = "#f5f5f5",
  backColor = "#e9e9e9",
  className = "",
  onCard
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
    style={{top: onCard ? '90px' : '-480px'}}
    className={`${styles.wrapper} ${className}`}>
      <div
        className={`${styles.flipCard} ${flipped ? styles.flipped : ""}`}
        onClick={() => setFlipped((prev) => !prev)}
        style={{ width, height }}
      >
        <div className={styles.flipInner}>
          <div
            className={styles.front}
            style={{ backgroundColor: frontColor }}
          />
          <div
            className={styles.back}
            style={{ backgroundColor: backColor }}
          />
        </div>
      </div>
    </div>
  );
}