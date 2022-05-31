import React, { FC } from "react";
import { AuthorsById, Book } from "../../types";

import styles from "./Books.module.scss";

interface Props {
  books: Book[];
  authors: AuthorsById;
}

export const BooksList: FC<Props> = ({ books, authors }) => {
  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <h4 className={styles.title}>Best-selling books</h4>
      </div>
      {books.length > 0 ? (
        books.map((book) => {
          const { name, authorId } = book;
          const author = authors[authorId];
          return (
            <div key={name} className={styles.row}>
              <div className={styles.col}>{name}</div>
              <div className={styles.col}>{author}</div>
            </div>
          );
        })
      ) : (
        <div className={styles.row}>
          <div className={styles.col}>No data available</div>
          <div className={styles.col}></div>
        </div>
      )}
    </div>
  );
};
