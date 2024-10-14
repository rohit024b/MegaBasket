import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Orders/myOrders.css'


const Wishlist = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token')


    const [wishList, setwishList] = useState([]);
    const fetchUserwishList = async () => {
        try {
            // setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishList`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                setwishList(response.data.wishlist);
                console.log(response.data.wishlist)
            } else {
                console.log("Failed to fetch wishList. Please try again.")
            }
            // setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(wishList)

    const handleRemoveProduct = async (productId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/delete/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                setwishList(response.data.wishlist);
            } else {
                console.log("Failed to fetch wishlist. Please try again.");
            }
        } catch (error) {
            console.error('Error fetching wishlits:', error);
        }
    };



    useEffect(() => {
        fetchUserwishList();
    }, []);

    return (
        <>
            <div style={{
                margin: 'auto',
                width: '1100px',
            }}>
                MywishList
                <div className="my-wishList-container">
                    <h2>My wishList</h2>
                    {wishList?.length === 0 ? (
                        <p>You have no wishList.</p>
                    ) : (
                        <ul className="order-list">
                            {wishList.map((order) => (
                                <li key={order._id} className="order-item">
                                    <div className="order-item-content">
                                        <img
                                            src={order.image}
                                            alt={order.name}
                                            className="order-item-image"
                                        />
                                        <div className="order-item-details">
                                            <h3>{order.name}</h3>
                                            <p>Price: Rs.{order.price}</p>
                                        </div>
                                        <button
                                            className="remove-button"
                                            onClick={() => handleRemoveProduct(order._id)}
                                        >
                                            Remove
                                        </button>
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

export default Wishlist