import { getAccount, getUserReviews } from "../../api/usersIndex";
import { useEffect, useState } from "react";

const Account = ({ token }) => {
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        const getAccountDetailsAPI = async () => {
            try {
                const res = await getAccount();
                setCurrentUser(res);
            } catch (error) {
                console.error('getAccount failed: ', error.message);
            }
        }
        getAccountDetailsAPI();
    })

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
                userReview.map((review, index) => (
                    <div key={ review.id }>
                        <h3><u>Review #{index + 1}</u>: { review.comment }</h3>
                    </div>
                ))
            )}
        </>
    )
}

export default Account