import React, { useEffect, useState, } from "react";
import { useParams, Link } from "react-router-dom";

const OrderDetails = ({ token }) => {
    const { id } = useParams();
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch order.");
                const data = await res.json()
                setOrder(data)
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, token]);

    if (loading) return <p>Loading order details...</p>;
    if (!order) return <p>Order not found.</p>

    const isoDate = new Date(order.date).toISOString();

    return (
        <div>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {isoDate}</p>
            <p><strong>Note:</strong> {order.note || "-"}</p>

            <Link to="/orders"> Back to Orders </Link>
        </div>
    );
};

export default OrderDetails;