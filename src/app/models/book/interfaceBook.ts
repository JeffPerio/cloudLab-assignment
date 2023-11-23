export interface InterfaceBook{
    bookId: number,
    bookTitle: string;
    bookAuthor: string;
    bookImage?: string;
    bookPrice?: number;
    bookReview?: {
        reviewComment: string,
        reviewRate: number
    }
}