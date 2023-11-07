import {bookService} from '../services/book.service.js'

const {useState} = React

export function ReviewAdd ({onAddReview}){

    const [review, setReview] = useState({fullName:'',rate:0,readAt:'' })

    function onHandleChange({ target }) {
        const { name, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                console.log('number')
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        // console.log('name:', name)
        // console.log('value:', value)
        setReview(prev => ({...prev , [name]: value}))
    }

    function addReview(ev){
        ev.preventDefault()
        onAddReview(review)
        setReview({fullName:'',rate:0,readAt:'' })
    }

    return (
        <section className="review-add">
            <h2>Add review</h2>
            <form onSubmit={addReview}>
                <label htmlFor="name">Full Name:</label>
                <input value={review.fullName} onChange={onHandleChange} name="fullName" type="text" id="name" />

                <label htmlFor="rate">Rate:</label>
                <input value={review.rate} onChange={onHandleChange} name="rate" type="range" id="rate" min="1" max="5" />
               
                <label htmlFor="readAt">Reat At:</label>
                <input value={review.readAt} onChange={onHandleChange} name="readAt" type="date" id="readAt" />

                <button>Add</button>
            </form>
        </section>
    )
}