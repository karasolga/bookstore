import { render, screen } from "@testing-library/react";
import { Card } from "./";

const mockAuthorsById = {
  1: "Olga Karaseva",
  2: "Douglas Crockford",
  3: "Marijn Haverbeke",
};

const mockBooksById = {
  1: {
    copiesSold: 12,
    name: "Unpopular book",
    authorId: "1",
  },
  2: {
    copiesSold: 56,
    name: "JavaScript: The Good Parts",
    authorId: "2",
  },
  8: {
    copiesSold: 26,
    name: "Eloquent JavaScript",
    authorId: "3",
  },
};

const mockStore = {
  type: "stores",
  id: "1",
  attributes: {
    name: "MicroBooks",
    website: "https://www.micro-books-store.com",
    rating: 4,
    storeImage:
      "https://i.pinimg.com/736x/51/a2/47/51a247e0d1785b89b70a17a1c8f31ac5--melbourne-australia-second-hand.jpg",
    establishmentDate: "1995-02-09T00:00:00+0000",
  },
  relationships: {
    countries: {
      data: {
        id: "1",
        type: "countries",
      },
    },
    books: {
      data: [
        { id: "1", type: "books" },
        { id: "2", type: "books" },
        { id: "8", type: "books" },
      ],
    },
  },
};

test("renders only 2 most sold books in the list", () => {
  render(
    <Card
      code="CH"
      store={mockStore}
      books={mockBooksById}
      authors={mockAuthorsById}
    />
  );
  expect(screen.queryByText("Unpopular book")).toBeNull();
  expect(screen.queryByText("JavaScript: The Good Parts")).toBeInTheDocument();
  expect(screen.queryByText("Eloquent JavaScript")).toBeInTheDocument();
});
