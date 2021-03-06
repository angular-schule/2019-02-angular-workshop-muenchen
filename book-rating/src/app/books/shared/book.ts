export interface Book {
    isbn: string;
    title: string;
    authors: string[];
    price: number;
    description: string;
    rating: number;
    firstThumbnailUrl?: string;
}
