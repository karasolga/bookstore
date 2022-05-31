import { render, screen } from "@testing-library/react";
import { BooksList } from ".";

const mockAuthors = {
  1: "Olga Karaseva",
  2: "Douglas Crockford",
  3: "Marijn Haverbeke",
};

const mockBooks = [
  {
    copiesSold: 12,
    name: "Olga is writing tests",
    authorId: "1",
  },
  {
    copiesSold: 56,
    name: "JavaScript: The Good Parts",
    authorId: "2",
  },
  {
    copiesSold: 26,
    name: "Eloquent JavaScript",
    authorId: "3",
  },
];

test("renders books list", () => {
  const emptyText = "No data available";
  render(<BooksList books={mockBooks} authors={mockAuthors} />);
  expect(screen.queryByText(emptyText)).toBeNull();
});

test("renders empty list", () => {
  const emptyText = "No data available";
  render(<BooksList books={[]} authors={mockAuthors} />);
  expect(screen.queryByText(emptyText)).toBeInTheDocument();
});
