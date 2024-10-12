const express = require('express');
const router = express.Router();
const ROLES = require('../constants/roles');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const auth = require('../middlewares/auth');
const checkAccess = require('../middlewares/CheckAccess');

// Add a product to the cart
router.post('/add/:id', auth, checkAccess([ROLES.USER, ROLES.SELLER]), async (req, res) => {
    try {
        const userId = req.user._id;  // Assuming the user is authenticated
        const { id } = req.params;

        // Find the user and product
        const user = await userModel.findById(userId);
        const product = await productModel.findById(id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        // Add product to cart if not already in cart
        if (!user.cart.includes(id)) {
            user.cart.push(id);
            await user.save();
        }

        res.status(200).json({ message: "Product added to cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's cart
router.get('/', auth, checkAccess([ROLES.USER, ROLES.SELLER]), async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate('cart');
        res.status(200).json({ cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a product from the cart
router.delete('/delete/:id', auth,checkAccess([ROLES.USER, ROLES.SELLER]), async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const id = req.params.id;

        user.cart = user.cart.filter(item => item.toString() !== id);
        await user.save();

        res.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
