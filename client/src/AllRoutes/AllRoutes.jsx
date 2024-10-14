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


const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Log />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/profile/:id' element={<UserProfile />} />
                <Route path='/myorders/:id' element={<MyOrders />} />
                <Route path='/cart/:id' element={<Cart />} />
                <Route path='/products/:id' element={<Products />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default AllRoutes