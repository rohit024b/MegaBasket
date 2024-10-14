import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css'; // Import your custom styles

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch cart items from backend (replace with your API)
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Attach the token to the request
                    }
                });
                if (response.status === 200) {
                    // Initialize quantity to 1 for each product if it doesn't exist
                    const updatedCart = response.data.cart.map(item => ({
                        ...item,
                        quantity: item.quantity || 1, // Initialize quantity to 1
                    }));
                    setCart(updatedCart);
                } else {
                    console.log("Failed to fetch Cart. Please try again.");
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    // Update total price based on cart items
    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cart]);

    // Handle quantity change
    const handleQuantityChange = (productId, change) => {
        setCart(cart.map((item) =>
            item._id === productId && item.quantity + change > 0
                ? { ...item, quantity: item.quantity + change }
                : item
        ));
    };

    // Remove product from cart
    const handleRemoveProduct = async (productId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                setCart(response.data.cart);
            } else {
                console.log("Failed to fetch Orders. Please try again.");
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Handle buy now action
    const handleBuyNow = () => {
        alert('Proceeding to checkout with total: Rs.' + totalPrice);
        // Proceed to checkout or payment page
    };

    return (

        <div style={{
            margin: 'auto',
            width: '1100px',
        }}>
            MyOrders
            <div style={{ margin: 'auto', width: '1100px' }}>
                <div className="cart-container">
                    <h2>My Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="cart-list">
                                {cart.map((item) => (
                                    <li key={item._id} className="cart-item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>
                                            <p>Price: Rs.{item.price}</p>
                                            <p className='line-through'>Rs.{item.dashedPrice}</p>
                                            <div className="cart-item-quantity">
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item._id, 1)}>
                                                    +
                                                </button>
                                            </div>
                                            <p>Subtotal: Rs.{(item.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                className="remove-button"
                                                onClick={() => handleRemoveProduct(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-summary">
                                <h3>Total: Rs.{totalPrice.toFixed(2)}</h3>
                                <button className="buy-now-button" onClick={handleBuyNow}>
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
