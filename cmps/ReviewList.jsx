
import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList ({reviews,onRemoveReview}){
    return (
        <section className="review-list">
            <h2>Review List</h2>
            <ul>
            {reviews.map(review=> <li key={review.id}>
            <ReviewPreview review={review}/>
                <button onClick={()=>{
                    onRemoveReview(review.id)
                }}>Remove</button>
            </li>)}
            </ul>
        </section>
    )
}