import React, { FC } from "react";
import styles from "./Rating.module.scss";

interface Props {
  rating: number;
  onClick: (value: number) => void;
}

export const Rating: FC<Props> = ({ rating, onClick }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      const value = index + 1;
      return (
        <span key={`star-${index}`} onClick={() => onClick(value)}>
          {value <= rating ? "★" : "☆"}
        </span>
      );
    });

  return <div className={styles.stars}>{stars}</div>;
};
