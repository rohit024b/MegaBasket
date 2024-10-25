import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Orders/myOrders.css'

const MyOrders = () => {

    const { id } = useParams();
    const token = localStorage.getItem('token')


    const [orders, setOrders] = useState([]);
    const fetchUserOrders = async () => {
        try {
            // setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                setOrders(response.data.orders);
                console.log(response.data.orders)
            } else {
                console.log("Failed to fetch Orders. Please try again.")
            }
            // setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(orders)


    useEffect(() => {
        fetchUserOrders();
    }, []);

    return (
        <>
            <div style={{
                margin: 'auto',
                width: '1100px',
            }}>
                MyOrders
                <div className="my-orders-container">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order._id} className="order-item">
                            <div className="order-item-content">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="order-item-image"
                                />
                                <div className="order-item-details">
                                    <h3>{order.name}</h3>
                                    <p>Due Amount: Rs.{order.price}</p>
                                    <p>Ordered on: {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
            </div>
        </>
    )
}

export default MyOrders