const express = require("express");
const auth = require("../middlewares/auth");
const checkAccess = require("../middlewares/CheckAccess");
const productModel = require("../models/product.model");
const ROLES = require("../constants/roles");
const categoryModel = require("../models/category.model");
const categoryRouter = express.Router()

// Create a new category (only seller)
categoryRouter.post('/', auth, checkAccess([ROLES.SELLER]),async (req, res) => {
    try {
        const { name } = req.body;

        // Create the category
        const newCategory = new categoryModel({
            name,
            products: []  // Initially, no products are associated
        });

        const savedCategory = await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: savedCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get all categories
categoryRouter.get('/', auth, checkAccess([ROLES.SELLER, ROLES.USER]), async (req, res) => {
    try {
        const categories = await categoryModel.find().populate('products', 'name');
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get category by ID
categoryRouter.get('/:id', auth, checkAccess([ROLES.SELLER, ROLES.USER]), async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id).populate('products', 'name');
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = categoryRouter
