import { useEffect, useState } from 'react';
import OrderItem from "./OrderItem.jsx";

const OrderList = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);//Shows a message when loading

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!res.ok) throw new Error('Failed to fetch orders.');

                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);//Always stop loading
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <div>
            <h2>Your Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList