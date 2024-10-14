import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [dashedPrice, setDashedPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const token = localStorage.getItem('token');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the product data
        const productData = {
            name,
            price,
            dashedPrice,
            description,
            image, // URL of the image
            category,
        };

        console.log(productData)
        try {
            // Send a POST request to create the product
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Attach the token to the request
                },
            });

            if (res.status === 201) {
                alert('New product added successfully!');
                // Reset the form fields after successful product creation
                setName('');
                setPrice('');
                setDashedPrice('');
                setDescription('');
                setImage('');
                setCategory('');
            } else {
                alert('Failed to add the product. Please try again.');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('An error occurred. Please check the input and try again.');
        }
    };

    return (
        <div style={{
            margin: 'auto',
            width: '1100px',
        }}>
            MyOrders
            <div style={{ margin: 'auto', width: '1100px' }}>
                <div style={{
                    margin: 'auto',
                    marginTop: '50px',
                    padding: '20px',
                    width: '400px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h2>Create New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Price (Rs.):</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Dashed Price (Rs.):</label>
                            <input
                                type="number"
                                value={dashedPrice}
                                onChange={(e) => setDashedPrice(e.target.value)}
                                placeholder="Enter dashed price"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                                required
                                rows="4"
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            ></textarea>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Image URL:</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter image URL"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Category:</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}  // Update the category state
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="beverages">Beverages</option>
                                <option value="bakery">Bakery</option>
                                <option value="mens">Mens</option>
                                <option value="womens">Womens</option>
                                <option value="childrens">Childrens</option>
                                <option value="kitchen">Kitchen</option>
                            </select>
                        </div>
                        <button type="submit" style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
