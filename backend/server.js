require('dotenv').config();
const express = require('express')
const app = express()
const cors = require("cors");
const startTheDB = require('./config/db');
const productRouter = require('./routes/product.controller');
const categoryRouter = require('./routes/category.controller');
const userRouter = require('./routes/user.controlelr');
const cartRouter = require('./routes/cart.controller');
const wishlistRouter = require('./routes/wishlist.controller');
const ordersRouter = require('./routes/oerders.controller');

app.use(express.json())


// Use CORS middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));



//health-check route
app.get("/", (req, res)=>{
    res.send("200 OK")
})

//routes
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('/wishlist',wishlistRouter)
app.use('/orders', ordersRouter)


app.listen(process.env.PORT, async()=>{
    await startTheDB()
    console.log(`Hello from ${process.env.PORT}`)
})