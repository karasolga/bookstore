import React, { useEffect, useState } from "react";
import { Card } from "./components/Card";
import "./App.scss";

import {
  Author,
  AuthorsById,
  Book,
  BooksById,
  CountriesById,
  Country,
  Store,
} from "./types";

type Attributes = Country | Author | Book;

interface IncGeneral {
  type: string;
  id: string;
  attributes: Attributes;
}
interface Included extends IncGeneral {
  relationships: {
    author: {
      data: {
        id: string;
      };
    };
  };
}

function App() {
  const [stores, setStores] = useState<Store[]>([]);
  const [books, setBooks] = useState<BooksById>({});
  const [countries, setCountries] = useState<CountriesById>({});
  const [authors, setAuthors] = useState<AuthorsById>({});
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/stores")
      .then((resp) => resp.json())
      .then(({ data, included }) => {
        const countriesTemp: CountriesById = {};
        const booksTemp: BooksById = {};
        const authorsTemp: AuthorsById = {};

        included.forEach((inc: Included) => {
          if (inc.type === "countries") {
            countriesTemp[inc.id] = (inc.attributes as Country).code;
          }

          if (inc.type === "books") {
            booksTemp[inc.id] = {
              copiesSold: (inc.attributes as Book).copiesSold,
              name: (inc.attributes as Book).name,
              authorId: inc.relationships.author.data.id,
            };
          }

          if (inc.type === "authors") {
            authorsTemp[inc.id] = (inc.attributes as Author).fullName;
          }
        });

        setAuthors(authorsTemp);
        setBooks(booksTemp);
        setCountries(countriesTemp);
        setStores(data);
      })
      .catch(() => {
        console.log("Loading error");
        setError(true);
      });
  }, []);

  if (error) return <div className="app">Loading error</div>;

  return (
    <div className="app">
      {stores.length ? (
        stores.map((store) => {
          const code = store.relationships.countries.data.id;
          return (
            <Card
              key={store.id}
              store={store}
              code={countries[code]}
              books={books}
              authors={authors}
            />
          );
        })
      ) : (
        <p>Loading stores data...</p>
      )}
    </div>
  );
}

export default App;
