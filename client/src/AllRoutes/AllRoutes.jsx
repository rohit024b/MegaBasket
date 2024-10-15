import React from 'react'

import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../components/isError/ErrorPage'
import SignUp from '../components/signup/SignUp'
import Log from '../components/Login/Log'
import UserProfile from '../components/UserProfile/UserProfile'
import MyOrders from '../components/Orders/MyOrders'
import Cart from '../components/Cart/Cart'
import Products from '../components/Products/Products'
import Wishlist from '../components/Wishlist/Wishlist'
import Create from '../components/AddProduct/Create'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import PrivateRoutes from './PrivateRoutes'


const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Log />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/create' element={<PrivateRoutes><Create/></PrivateRoutes>} />
                <Route path='/profile/:id' element={<PrivateRoutes><UserProfile /></PrivateRoutes>} />
                <Route path='/singleproduct/:id' element={<SingleProduct />} />
                <Route path='/myorders/:id' element={<MyOrders />} />
                <Route path='/wishlist/:id' element={<Wishlist />} />
                <Route path='/cart/:id' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
                <Route path='/products/:id' element={<Products />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default AllRoutes