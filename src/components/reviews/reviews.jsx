// Show all reviews for the product from all users
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reviews(){
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        const getReviews = async () => {
            try{
                const token = localStorage.getItem("authToken");

                const res = await fetch(`/api/products/${id}/reviews`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setReviews(data);
            } catch(err){
                console.error("Failed to fetch reviews:", err);
            }}
            getReviews();
    }, [id]);

    return(
        <div>
            <h2>Reviews</h2>

            {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, idx) => (
                    <div key = {idx} className = "review">
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                    </div>
            ))
            ) : (
                <p>No reviews yet</p>
            )} 
        </div>
    );
}

export default Reviews;