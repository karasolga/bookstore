import { RawBook } from './Book';

interface Attributes {
    name: string;
    website: string;
    rating: number;
    storeImage: string;
    establishmentDate: string;
}

export interface Store {
    type: string
    id: string
    attributes: Attributes
    relationships: {
        countries: {
            data: {
                id: string,
                type: string
            }
        },
        books: {
            data: RawBook[]
        }
    }
}

