import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        city: ""
    });

    const handleSignup = (e) => {
        const { value, name } = e.target;

        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data);
            if (response.status === 201) {
                alert("You are successfully registered. Please login!")
                navigate("/login")
            }
        } catch (err) {
            if (err.response) {
                // If the response is available, extract the error message
                setError(err.response?.data?.err || "An error occurred"); 
            } else {
                // console.log(err.response)
                setError("Registration failed. Please try again.");
            }
        }
    }


    return (
        <>
        <div className="flex flex-col gap-2 max-w-[500px] m-auto">
            <h3 className="text-lg font-bold mt-[100px]">Please Register</h3>
            {error && <p className="text-red-500">{error}</p>}
            <input
                name="name"
                onChange={(e) => handleSignup(e)}
                value={data.userName}
                className="border-black border rounded-sm"
                type="text"
                id="name"
                placeholder="ENTER NAME"
            />
            <input
                name="password"
                onChange={(e) => handleSignup(e)}
                value={data.password}
                className="border-black border rounded-sm"
                type="password"
                id="password"
                placeholder="ENTER PASSWORD"
            />
            <input
                name="email"
                onChange={(e) => handleSignup(e)}
                value={data.email}
                className="border-black border rounded-sm"
                type="email"
                id="email"
                placeholder="ENTER EMAIL"
            />
            <input
                name="phone"
                onChange={(e) => handleSignup(e)}
                value={data.phone}
                className="border-black border rounded-sm"
                type="tel"
                id="phone"
                placeholder="ENTER PHONE 8 DIGITS"
            />
            <input
                name="city"
                onChange={(e) => handleSignup(e)}
                value={data.city}
                className="border-black border rounded-sm"
                type="text"
                id="city"
                placeholder="ENTER CITY"
            />
            
            
            <button onClick={handleRegister} className="bg-red-600 text-white p-2">Register</button>
        </div>
        </>
    )
}

export default SignUp