import React, { useState } from 'react'
import '../Home/Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [category, setCategory] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = async () => {
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen);
    // /fetching categories
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
        headers: {
          'Authorization': `Bearer ${token}`  // Attach the token to the request
        }
      });
      if (res.status === 200) {
        const categories = res.data.map((item) => ({
            id: item._id,      // Store the _id
            name: item.name    // Store the name
        }));
        setCategory(categories);  // Set the array of objects to the state
    }

    } catch (error) {
      console.log(error)
    }
  };

  const handlecategory=(catId)=>{
    console.log(catId)
    navigate(`/products/${catId}`)
  }

  return (
    <>
      <div className='container-nav-two'>

        <button className='shopbycatButton' onClick={toggleDropdown}>
          <span>Shop by Category <i className='bx bx-chevron-down' ></i></span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-overlay2" onClick={toggleDropdown}>
            <div className="dropdown-menu2">
              <ul>
                {
                  category.map((cat, index) => {
                    return <li onClick={()=>handlecategory(cat.id)} key={cat.id}>{cat.name}</li>
                  })
                }
              </ul>
            </div>
          </div>
        )}

        <span>Exotic fruits & vegetables</span>
        <span>Tea</span>
        <span>Ghee</span>
        <span>Fresh Vegetables</span>
        <b>Smart Basket</b>
        <b>Offers</b>
      </div>

      <div style={{
        width: "1100px",
        height: '100vh',
        paddingTop: '5px',
        margin: 'auto',
        display: 'flex',
        gap: '25px'
      }}>
        asda
      </div>
    </>

  )
}

export default Home