export interface RawBook {
    id: string
    type: string
}

export interface Book {
    copiesSold: number;
    name: string;
    authorId: string;
}

export interface BooksById {
    [key: string]: Book;
  }