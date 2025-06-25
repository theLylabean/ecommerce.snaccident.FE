// Display current user's orders and their reviews
import { useEffect, useState } from "react";

function UserReviews({ token }) {
    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/orders/${id}`, {
                    headers:{"Content-Type": "application/json", Authorization: `Bearer ${token}`}
                });
                const result = await res.json();
                setOrders(result);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, [id]);

    return (
        <div>
            <h1>Your Orders and Reviews</h1>
            {orders.map((order) => (
                <div key={order.id} style={{ marginBottom: "20px" }}>
                    <h2>Order ID: {order.id}</h2>
                    <h3>Product: {order.productName}</h3>
                    {order.review ? (
                        <div>
                            <h4>Your Review:</h4>
                            <p>Rating: {order.review.rating}</p>
                            <p>Comment: {order.review.comment}</p>
                        </div>
                    ) : (
                        <p>No review submitted for this product.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UserReviews;