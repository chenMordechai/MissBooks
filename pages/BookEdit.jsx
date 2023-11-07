import {bookService} from '../services/book.service.js'
import {eventBusService} from "../services/event-bus.service.js"

const {useState, useEffect} = React
const {useParams ,useNavigate} = ReactRouterDOM

export function BookEdit (){

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(params.bookId) loadBook(params.bookId)
    },[])

    function loadBook(bookId){
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function onHandleChange({ target }) {
        const { name, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setBookToEdit((prevBook)=>{
            if(name === 'price') {
                const newBook = {...prevBook}
                newBook.listPrice.amount = value
                return  newBook
            }
            return  {...prevBook, [name]: value}
        })
    }

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(()=>{
                eventBusService.emit('user-msg' ,{txt:'Save book', type:'success'})
                navigate('/book')
            })
            .catch(err=>{
                eventBusService.emit('user-msg' ,{txt:'Failed saving book', type:'error'})
                console.log('err:', err)
            })
    }

    return (
        <section className="book-edit">
            <h2>Book Edit</h2>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={bookToEdit.title} onChange={onHandleChange} type="text" id="title" name="title" placeholder="title" />
                <label htmlFor="price">Price:</label>
                <input value={bookToEdit.listPrice.amount} onChange={onHandleChange} type="number" id="price" name="price" placeholder="price" />
                <button>Save</button>
            </form>
        </section>
    )
}