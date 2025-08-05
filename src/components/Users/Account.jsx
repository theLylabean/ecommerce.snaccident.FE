import { getAccount } from "../../api/usersIndex";
import { getUserReviews } from "../../api/reviewsIndex";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import '../../css/account.css';

const Account = ({ currentUser, setCurrentUser }) => {
    const [userReview, setUserReview] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const getAccountDetailsAPI = async () => {
            try {
                const res = await getAccount();
                setCurrentUser(res)
            } catch (error) {
                console.error('getAccount failed: ', error.message);
            }
        };

    getAccountDetailsAPI();
}, []);

    useEffect(() => {
        if (!token) return;
        const getUserReviewsApi = async () => {
            const { id: user_id } = jwtDecode(token);
            if (!user_id) {
                console.warn('❌ user_id not found in token.');
                return;
            }
            const userReviews = await getUserReviews(user_id);
            setUserReview(userReviews);
        }
        getUserReviewsApi();
    }, [])

    return (
        <>
            <div className='account-header-container'>
            <h1>
                Welcome to your Account Page, <u>{currentUser?.first_name}!</u>
            </h1>
            </div>
            <div className='personal-info-container'>
                <p><u>Name</u>:&nbsp;{currentUser?.first_name}&nbsp;{currentUser?.last_name}</p>
                <p><u>Email</u>:&nbsp;{currentUser?.email}</p>
                <p><u>Username</u>:&nbsp;{currentUser?.username}</p>
            </div>
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