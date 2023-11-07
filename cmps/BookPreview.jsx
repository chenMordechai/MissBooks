import { utilService } from "../services/util.service.js"


export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Title : {book.title}</h2>
            <h2>Price : {book.listPrice.amount}</h2>
            <img src={book.thumbnail} />
            {/* <img src={`../assets/img/${utilService.getRandomIntInclusive(1,22)}.jpg`} /> */}
        </article>
    )
}