import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onSelectBookId }) {
    const [book, setBook] = useState()

    useEffect(() => {
        bookService.get(bookId).then(book => {
            setBook(book)
        })
    }, [])

    function getTextByPageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
    }

    function getTextByDate() {
        const currYear = (new Date).getFullYear()
        console.log('currYear:', currYear)
        if (book.publishedDate < currYear - 10) return 'Vintage'
        else if (book.publishedDate > currYear - 1) return 'New'
    }

    function getClassByPrice() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
    }


    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <button onClick={() => onSelectBookId(null)}>Back</button>
            <h2>Book Details:</h2>
            {book.listPrice.isOnSale && <h4>On Sale!</h4>}
            <h3 className={getClassByPrice()}>Price: {book.listPrice.amount + ' ' + book.listPrice.currencyCode}</h3>
            <h3>Title: {book.title}</h3>
            <h3>Subtitle: {book.subtitle}</h3>
            <h4>Description: {book.description}</h4>
            <h4>Description: <LongTxt txt={book.description} length="10" /> </h4>
            <h3>{getTextByPageCount()}</h3>
            <h3>{getTextByDate()}</h3>
            <img src={book.thumbnail} />

        </section>
    )
}