import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categoryes, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = async () => {
    setIsDropdownOpen((prevState) => !prevState);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const categories = res.data.map((item) => ({
          id: item._id,
          name: item.name,
        }));
        setCategory(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCateforyName = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const categoryNames = res.data.map((item) => item.name);
        setCategoryName(categoryNames);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlecategory = (catId) => {
    console.log(catId);
    navigate(`/products/${catId}`);
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products.');
        setLoading(false);
      }
      getCateforyName();
    };

    fetchProductsByCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    const handleProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`); // Navigate to product details page
        // setIsSearching(false); // Hide search results
    };

  return (
    <>
      <div className="container-nav-two">
        <button className="shopbycatButton" onClick={toggleDropdown}>
          <span>
            Shop by Category <i className="bx bx-chevron-down"></i>
          </span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-overlay2" onClick={toggleDropdown}>
            <div className="dropdown-menu2">
              <ul>
                {category.map((cat) => (
                  <li onClick={() => handlecategory(cat.id)} key={cat.id}>
                    {cat.name}
                  </li>
                ))}
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

      <div
        style={{
          width: '1100px',
          height: '100vh',
          paddingTop: '5px',
          margin: 'auto',
          display: 'flex',
          gap: '25px',
        }}
      >
        <div className="home-container">
          {categoryes.map((item, index) => (
            <div key={item.name} className="category-section">
              <h2 className="category-title">{categoryName[index]}</h2> {/* Display category name based on index */}
              <div className="category-products">
                {Array.isArray(item.products) && item.products.length > 0 ? (
                  item.products.slice(0, 5).map((product) => (
                    <div onClick={() => handleProductClick(product._id)}  key={product.id} className="product-cards">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="product-details">
                        <h3>{product.name}</h3>
                        <p className="product-price">
                          Price: ₹{product.price.toFixed(2)}
                        </p>
                        <p className="product-dashed-price">
                          <span style={{ textDecoration: 'line-through' }}>
                            ₹{product.dashedPrice.toFixed(2)}
                          </span>
                        </p>
                        <p className="product-savings">
                          You save:{' '}
                          {Math.round(
                            ((product.dashedPrice - product.price) /
                              product.dashedPrice) *
                              100
                          )}
                          % off
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
