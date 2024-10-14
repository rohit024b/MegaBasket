import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Products/Products.css'
import { jwtDecode } from 'jwt-decode'


const Products = () => {

    const [prod, setProd] = useState([])
    const { id } = useParams();
    const [catName, setCatName] = useState();
    const token = localStorage.getItem('token')
    const [role, setRole] = useState('');

    useEffect(() => {
        // Get the token from localStorage
        if (token) {
            try {
                // Decode the token to get the payload
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role);  // Extract the role and store it in state
            } catch (error) {
                console.error("Failed to decode token", error);
            }
        }
    }, []);



    const fetchProductsFromCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            // console.log(res.data)

            if (res.status === 200) {
                const selectedCategory = res.data.find((item) => item._id === id);
                // console.log(id)
                if (selectedCategory) {
                    // Get the products array from the matching category
                    const { name, products } = selectedCategory;

                    // Set both the products array and category name to state
                    setProd(products);  // Set the products array from the matched category
                    setCatName(name);  // Set the category name in state
                    // console.log(catName, prod)
                } else {
                    console.log("Category not found");
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleUnlistProduct = async(productId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                alert('Item Unlisted from the Web Store!!')
                // setProd(response.data);
                setProd(prevProd => prevProd.filter(product => product._id !== productId));
                console.log(response.data)
            } else {
                console.log("Failed to fetch Orders. Please try again.");
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    useEffect(() => {
        fetchProductsFromCategory();
    }, [])

    const calculateDiscount = (price, dashedPrice) => {
        if (dashedPrice > price) {
            return Math.round(((dashedPrice - price) / dashedPrice) * 100);
        }
        return 0;
    };

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

    return (
        <div style={{
            margin: 'auto',
            width: '1100px',
        }}>
            MyOrders
            <div>
                <div className="products-container">
                    <h1>{catName}</h1> {/* Category name displayed at the top */}
                    <div className="products-grid">
                        {prod.length === 0 ? (
                            <p>No products found in this category.</p>
                        ) : (
                            prod.map((product) => (
                                <div className="product-card" key={product._id}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">Rs.{product.price}</p>
                                    <p className="product-dashed-price line-through">Rs.{product.dashedPrice}</p>
                                    {product.dashedPrice && product.price && (
                                        <p className="discount" style={{ color: 'green' }}>
                                            {calculateDiscount(product.price, product.dashedPrice)}% OFF
                                        </p>
                                    )}
                                    <div className='flex flex-col gap-1 items-center'>
                                        <button onClick={() => handleaddToCart(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                                            <span>Add To Cart</span>
                                        </button>
                                        <button onClick={() => handleaddTowishlist(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                                            <span>Add To Wishlist</span>
                                        </button>
                                        {
                                            role === 'seller' ? <button onClick={() => handleUnlistProduct(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                                                <span>Unlist the Item</span>
                                            </button> : ""
                                        }
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products