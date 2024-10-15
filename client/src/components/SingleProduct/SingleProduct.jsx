import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.css'; // Optional: if you want to style separately

const SingleProduct = () => {
    const { id } = useParams(); // Getting product ID from URL params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')

    const handleaddToCart = async (id) => {
        console.log(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/add/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (res.status === 200) {
                alert("Item Added to the cart 👍")
            } else {
                alert("Something Went wront try after somtime!!")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleaddTowishlist = async (id) => {
        console.log(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/add/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (res.status === 200) {
                alert("Item Added to the WishList 👍")
            } else {
                alert("Something Went wront try after somtime!!")
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`  // Attach the token to the request
                        }
                    }
                ); // Fetching the product details
                setProduct(response.data); // Assuming product data comes from the response
                setLoading(false);
            } catch (err) {
                setError('Error fetching product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const { name, price, dashedPrice, description, image } = product;
    const savingsPercentage = Math.round(((dashedPrice - price) / dashedPrice) * 100);

    return (
        <div style={{
            margin: 'auto',
            width: '1100px',
        }}>
            MyOrders
            <div className="single-product-container">
                <div className="product-image">
                    <img src={image} alt={name} />
                </div>
                <div className="product-details">
                    <h2>{name}</h2>
                    <p className="product-price">
                        Price: ₹{price.toFixed(2)}
                    </p>
                    <p className="product-dashed-price">
                        <span style={{ textDecoration: 'line-through' }}>₹{dashedPrice.toFixed(2)}</span>
                    </p>
                    <p className="product-savings">
                        You save: {savingsPercentage}% off
                    </p>
                    <span className='btns'>
                        <button onClick={() => handleaddToCart(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                            <span>Add To Cart</span>
                        </button>
                        <button onClick={() => handleaddTowishlist(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                            <span>Add To Wishlist</span>
                        </button>
                    </span>
                </div>
            </div>
            <p className="product-description">
                        {description}
                    </p>
        </div>
    );
};

export default SingleProduct;
