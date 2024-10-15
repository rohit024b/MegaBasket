import React, { useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import { useNavigate } from 'react-router-dom'
import ErrorPage from '../isError/ErrorPage'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const Navbar = () => {

    const token = localStorage.getItem('token')
    const [role, setRole] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]); // Store search results
    const [isSearching, setIsSearching] = useState(false); // To show/hide search results

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

    const navigate = useNavigate();
    // Handle input change in search bar
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                setIsSearching(true);
                // Call backend to fetch products
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/product?name=${query}`);
                setSearchResults(response.data.msg); // Assuming the data structure
            } catch (error) {
                console.error("Error fetching search results", error);
            }
        } else {
            setIsSearching(false); // Hide results if query is empty
            setSearchResults([]);
        }
    };

    // Handle product selection and navigation to product details
    const handleProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`); // Navigate to product details page
        setIsSearching(false); // Hide search results
    };


    //for profile drop down/login
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleProfile = () => {
        if (!token) {
            navigate('/login')
        } else {
            setIsDropdownOpen((prev) => !prev);
        }

    }

    const userID = localStorage.getItem('userId')
    const handleUserProfile = async () => {
        navigate(`/profile/${userID}`)
    }

    const handleOrders = () => {
        navigate(`/myorders/${userID}`)
    }
    const handleCart = () => {
        navigate(`/cart/${userID}`)
    }
    const handleWishlist = () => {
        navigate(`/WishList/${userID}`)
    }
    const handleAddProduct = () => {
        navigate(`/create`)
    }

    const handlelogout = () => {
        try {
            if (token) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                // Optionally redirect the user to the login page
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <header className='shadow-md topHeader'>
                <div className='container-top'>
                    <div className='nav-content'>
                        <a href="/">
                            <img width={'150px'} style={{ objectFit: 'contain' }}
                                src="https://i.imgur.com/t5OgiWt.png" alt="logo" />
                        </a>

                        {/* <div className='search-nav'>
                            <span className='search-box-nav'>
                                <i className='bx bx-search' style={{
                                    fontSize: '20px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                </i>
                                <input style={{ width: '100%', outline: 'none' }} type="search" placeholder="Search Fro Product" />
                            </span>
                        </div> */}
                        <div className='search-nav'>
                            <span className='search-box-nav'>
                                <i className='bx bx-search' style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}></i>
                                <input
                                    style={{ width: '100%', outline: 'none' }}
                                    type="search"
                                    placeholder="Search for Product"
                                    value={searchQuery}
                                    onChange={handleSearchChange} // Listen to changes
                                />
                            </span>
                        </div>
                        {isSearching && searchResults.length > 0 && (
                                <ul className="search-results-dropdown absolute searchBoxData">
                                    {searchResults.map(product => (
                                        <li className='flex gap-2' key={product._id} onClick={() => handleProductClick(product._id)}>
                                            <img width={'50px'} src={product.image} alt="" />
                                            {product.name}
                                        </li>
                                    ))}
                                </ul>
                            )}


                    </div>
                    <div className='log-container'>
                        <div className="flex w-full gap-8" >
                            <button style={{ backgroundColor: 'lightgray', width: '100%', textAlign: 'left' }} type="button">
                                <span style={{ display: 'flex' }}>
                                    <svg width="15" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m13.733 3.434.817 1.049s.093.113.122.2c.042.124 0 .335 0 .335l-.252 2.536c0 .229-.372.608-.601.608h-1.215C12.414 9.207 11.516 10 10.441 10c-1.077 0-1.975-.795-2.164-1.842H6.769C6.579 9.205 5.68 10 4.605 10 3.528 10 2.63 9.205 2.44 8.158H1.252c-.277 0-.566-.289-.566-.645 0-.357.289-.646.566-.646H2.58a2.204 2.204 0 0 1 2.026-1.373c.909 0 1.69.566 2.026 1.373h1.784a2.204 2.204 0 0 1 2.026-1.373c.914 0 1.7.573 2.032 1.388l.573-.015.119-1.85-.462-.553H8.926c-.23 0-.504-.316-.504-.65l.848-2.44H2.34c-.23 0-.624-.344-.624-.687 0-.344.394-.687.623-.687H10.3c.344 0 .687 0 .686.343l-.098.344h1.018c.157 0 .42.287.49.441l1.338 2.306Zm-1.428-.113-.631-1.26h-1.181l-.363 1.26h2.175ZM4.697 2.007H1.832c-.457 0-.827.29-.827.646 0 .356.37.645.827.645h2.865c.456 0 .826-.289.826-.645 0-.357-.37-.646-.826-.646ZM3.692 4.014H.827c-.457 0-.827.29-.827.646 0 .356.37.645.827.645h2.865c.456 0 .826-.289.826-.645 0-.357-.37-.646-.826-.646Zm-.03 3.733c0-.533.423-.966.943-.966s.943.433.943.966a.956.956 0 0 1-.943.965.956.956 0 0 1-.944-.965Zm5.836 0c0-.533.423-.966.943-.966s.943.433.943.966a.956.956 0 0 1-.943.965.956.956 0 0 1-.943-.965Z" fill="#606060"></path></svg><span className="Label-sc-15v1nk5-0 gJxZPQ ml-1 flex-1 text-xs font-bold">Get it in 12 hrs</span></span><span className="Label-sc-15v1nk5-0 gJxZPQ w-full inline text-sm text-darkOnyx-600 leading-md truncate">400008, Mumbai
                                </span>
                            </button>

                            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                                <button onClick={handleProfile} style={{ backgroundColor: 'lightgray', width: '100%' }}>
                                    {
                                        token ? <i className='bx bxs-user-circle' style={{ fontSize: '28px' }}></i> : <b>Login</b>
                                    }
                                </button>


                                <button onClick={handleCart} style={{ backgroundColor: 'lightgray', width: '100%', display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#D63333"></rect><path fillRule="evenodd" clipRule="evenodd" d="M16.795 10.2H18.3c.385 0 .7.315.7.7 0 .385-.315.7-.7.7H5.7a.702.702 0 0 1-.7-.7c0-.385.315-.7.7-.7h1.505l.998-3.01A1.75 1.75 0 0 1 9.864 6h4.27c.752 0 1.435.473 1.662 1.19l.998 3.01ZM8.867 7.418 7.94 10.2h8.12l-.91-2.782a1.035 1.035 0 0 0-.998-.718H9.866c-.455 0-.857.28-.998.718ZM6.05 16.85V12.3h11.9v4.55c0 .962-.787 1.75-1.75 1.75H7.8c-.962 0-1.75-.788-1.75-1.75Zm3.465.367c.157 0 .297-.14.297-.314v-2.888c0-.175-.122-.315-.297-.315a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888A.314.314 0 0 0 12 13.7a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888a.314.314 0 0 0-.315-.315c-.157 0-.297.14-.297.315v2.887c0 .175.122.316.297.316Z" fill="#fff"></path><mask id="basket_svg__a" maskUnits="userSpaceOnUse" x="5" y="6" width="14" height="13" style={{ masktype: "alpha" }}><path fillRule="evenodd" clipRule="evenodd" d="M16.795 10.2H18.3c.385 0 .7.315.7.7 0 .385-.315.7-.7.7H5.7a.702.702 0 0 1-.7-.7c0-.385.315-.7.7-.7h1.505l.998-3.01A1.75 1.75 0 0 1 9.864 6h4.27c.752 0 1.435.473 1.662 1.19l.998 3.01ZM8.867 7.418 7.94 10.2h8.12l-.91-2.782a1.035 1.035 0 0 0-.998-.718H9.866c-.455 0-.857.28-.998.718ZM6.05 16.85V12.3h11.9v4.55c0 .962-.787 1.75-1.75 1.75H7.8c-.962 0-1.75-.788-1.75-1.75Zm3.465.367c.157 0 .297-.14.297-.314v-2.888c0-.175-.122-.315-.297-.315a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888A.314.314 0 0 0 12 13.7a.314.314 0 0 0-.315.315v2.887c0 .175.14.316.315.316Zm2.485 0c.175 0 .315-.14.315-.314v-2.888a.314.314 0 0 0-.315-.315c-.157 0-.297.14-.297.315v2.887c0 .175.122.316.297.316Z" fill="#606060"></path></mask><g mask="url(#basket_svg__a)"><path fill="#fff" d="M0 0h24v24H0z"></path></g></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <>
                {isDropdownOpen && (
                    <div className="dropdown-overlay1" onClick={handleProfile}>
                        <div className="dropdown-menu1">
                            <ul>
                                <li onClick={handleUserProfile}>Profile</li>
                                <li onClick={handleOrders}>Orders</li>
                                <li onClick={handleCart}>Cart</li>
                                <li onClick={handleWishlist}>Wishlist</li>
                                {
                                    role === 'seller' ? <li onClick={handleAddProduct} className='text-red-500'>Add Products</li> : ""
                                }
                                <li onClick={handlelogout}>Log Out</li>
                            </ul>
                        </div>
                    </div>
                )}
            </>
        </>
    )
}

export default Navbar