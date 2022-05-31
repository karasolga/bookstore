import React, { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { BooksList } from "../Books";
import { Rating } from "../Rating";
import { AuthorsById, BooksById, Store, Book } from "../../types";
import styles from "./Card.module.scss";

interface Props {
  store: Store;
  code: string;
  books: BooksById;
  authors: AuthorsById;
}

export const Card: FC<Props> = ({ store, code, books, authors }) => {
  const [flag, setFlag] = useState("");
  const [ratedBooks, setRatedBooks] = useState<Book[] | []>([]);
  const { name, website, rating, storeImage, establishmentDate } =
    store.attributes;

  const { books: booksRelationships } = store.relationships;

  const formattedDate = format(new Date(establishmentDate), "dd.MM.yyyy");

  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha/${code}`)
      .then((resp) => resp.json())
      .then((data) => {
        setFlag(data.flag);
      });

    let newBooks: Book[] | [] =
      booksRelationships?.data.map((book) => books[book.id]) || [];

    newBooks = newBooks.sort((a, b) => a.copiesSold - b.copiesSold).slice(-2);

    setRatedBooks(newBooks);
  }, [booksRelationships, books, code]);

  const updateRating = (rating: number) => {
    console.log("Rated at", rating);
    fetch(`http://localhost:3000/stores/${store.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "stores",
        id: store.id,
        attributes: { rating },
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then(({ data }) => {
        console.log("data after the rating update", data);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.image}>
          <img src={`${storeImage}`} alt="Store" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{name}</h2>
            <Rating rating={rating} onClick={updateRating} />
          </div>
          <div>
            <BooksList books={ratedBooks} authors={authors} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLink}>
          <span>{formattedDate} - </span>
          <a href={website} className={styles.link}>
            <span className={styles.linkText}>{website}</span>
            <span className={styles.linkIcon}>🌐</span>
          </a>
        </div>
        <img src={flag} alt="country flag" className={styles.flag} />
      </div>
    </div>
  );
};
