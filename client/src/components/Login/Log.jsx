import React, { useState } from 'react'
import '../Login/login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Log = () => {

    const token = localStorage.getItem('token')

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleForm = (e) => {
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // Save token to local storage
                localStorage.setItem("userId", response.data.userId);
                alert("You are successfully logged in!")
                navigate("/")
            }
        } catch (err) {
            if (err.response) {
                // If the response is available, extract the error message
                setError(err.response.data || "An error occurred"); 
            } else {
                setError("Login failed. Please try again.");
            }
        }

    };

    const handleSignUp = () => {
        navigate('/signup')
        console.log('Redirect to Sign Up page');
    };

    return (
        <>
            <div className="login-containerr">
                <h2 >Login</h2>
                <form onSubmit={(e)=>handleLogin(e)} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name='email'
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => handleForm(e)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            name='password'
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => handleForm(e)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Login</button>

                    <p className='text-center mt-1' >Dont have an account?</p>
                    <button type="button" className="signup-button" onClick={handleSignUp}>
                        <b>Sign Up</b>
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
                
            </div>
        </>
    );
}

export default Log