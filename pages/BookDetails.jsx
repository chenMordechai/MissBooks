import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewAdd } from "../cmps/ReviewAdd.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { bookService } from "../services/book.service.js"
import {eventBusService} from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err=>{
                console.log('err:', err)
                navigate('/book')
             })
    }, [params.bookId])

    function getTextByPageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
    }

    function getTextByDate() {
        const currYear = (new Date).getFullYear()
        if (book.publishedDate < currYear - 10) return 'Vintage'
        else if (book.publishedDate > currYear - 1) return 'New'
    }

    function getClassByPrice() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
    }

    function onRemoveReview(reviewId){
        bookService.removeReview(book.id,reviewId)
        .then((newBook)=>{
                setBook(newBook)
            })
    }

    function onAddReview(review){
        bookService.addReview(book.id,review)
        .then((newBook)=>{
            eventBusService.emit('user-msg' ,{txt:'Save review', type:'success'})
            setBook(newBook)
        })
        .catch(err=>{
            eventBusService.emit('user-msg' ,{txt:'Failed saving review', type:'error'})
            console.log('err:', err)
        })
    }


    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <button><Link to="/book"> Back</Link></button>
            <h2>Book Details:</h2>
            {book.listPrice.isOnSale && <h4>On Sale!</h4>}
            <h3 className={getClassByPrice()}>Price: {book.listPrice.amount + ' ' + book.listPrice.currencyCode}</h3>
            <h3>Title: {book.title}</h3>
            <h3>Subtitle: {book.subtitle}</h3>
            <h4>Description: {book.description}</h4>
            <h4>Description: <LongTxt txt={book.description} length="80" /> </h4>
            <h3>{getTextByPageCount()}</h3>
            <h3>{getTextByDate()}</h3>
            <img src={book.thumbnail} />
            <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview}/>
            <ReviewAdd onAddReview={onAddReview}/>
        </section>
    )
}