import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../Products/Products.css'

const Products = () => {

    const [prod, setProd] = useState([])
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [catName, setCatName] = useState();



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

    useEffect(() => {
        fetchProductsFromCategory();
    }, [])

    const calculateDiscount = (price, dashedPrice) => {
        if (dashedPrice > price) {
            return Math.round(((dashedPrice - price) / dashedPrice) * 100);
        }
        return 0;
    };

    const handleaddToCart= async(id)=>{
        console.log(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/add/${id}`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if(res.status === 200){
                alert("Item Added to the cart 👍")
            }else{
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
                                    <button onClick={() => handleaddToCart(product._id)} className='bg-red-600 w-[200px] text-white p-2 rounded'>
                                        <span>Add To Cart</span>
                                    </button>
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