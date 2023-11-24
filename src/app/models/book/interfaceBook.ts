import { InterfaceComment } from "./interfaceComment";

export interface InterfaceBook{
    bookId: number,
    bookTitle: string;
    bookAuthor: string;
    bookImage?: string;
    bookPrice?: number;
    bookReviews?: InterfaceComment[]
}