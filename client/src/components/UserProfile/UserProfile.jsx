import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import '../UserProfile/userProfile.css'

const UserProfile = () => {

    const {id} = useParams();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const userID = localStorage.getItem('userId')

    const [userData, setUserData] = useState();
    const fetchUser = async () => {
        try {
            // setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach the token to the request
                }
            });
            if (response.status === 200) {
                setUserData(response.data.userData);
                // console.log(response)
            } else {
                console.log("Failed to fetch Data. Please try again.")
            }
            // setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    
  return (
    <>
    <div style={{
        margin:'auto',
        width:'1100px',
    }}>
        hello
        <div className="user-profile-container">
            <div className="profile-header">
                <div className="profile-pic-wrapper">
                    <img
                        src={'https://via.placeholder.com/150'} // Fallback if no profile picture
                        alt="Profile"   
                        className="profile-pic"
                    />
                </div>
                <h2>{userData?.name}</h2>
            </div>
            <div className="profile-details">
                <div className="profile-info">
                    <p><strong>Email:</strong> {userData?.email}</p>
                    <p><strong>Phone:</strong> {userData?.phone}</p>
                    <p><strong>City:</strong> {userData?.city}</p>
                </div>
                <button onClick={()=>{navigate(`/myorders/${userID}`)}} className="profile-section">
                    <h3>Your Orders</h3>
                </button>
                <button onClick={()=>{navigate(`/wishlist/${userID}`)}} className="profile-section">
                    <h3>Wishlist</h3>
                </button>
            </div>
        </div>
    </div>
    </>

  )
}

export default UserProfile