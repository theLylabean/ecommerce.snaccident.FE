import React from "react";

const OrderItem = ({ order }) => {
    const isoDate = new Date(order.date).toISOString()

    return (
        <li>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {isoDate}</p>
            <p><strong>Note:</strong> {order.note || "-"}</p>
        </li>
    );
};

export default OrderItem;