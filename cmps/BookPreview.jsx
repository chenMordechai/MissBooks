import { utilService } from "../services/util.service.js"


export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title : {book.title}</h2>
            <img src={book.thumbnail} />
        </article>
    )
}