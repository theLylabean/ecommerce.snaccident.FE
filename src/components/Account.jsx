import { getUserReviews } from "../api/index.js";
import { useEffect, useState } from "react";

const Account = ({ token }) => {
    const [userReview, setUserReview] = useState([]);
    useEffect(() => {
        const getUserReviewsApi = async () => {
            const userReviews = await getUserReviews(token);
            setUserReview(userReviews);
        }
        getUserReviewsApi();
    }, [])
    return (
        <>
            { userReview && (
                userReview.map((review) => (
                    <div key={ review.id }>
                        <h3>{ review.comment }</h3>
                    </div>
                ))
            )}
        </>
    )
}

export default Account