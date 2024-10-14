const express = require("express");
const productModel = require("../models/product.model");
const ROLES = require("../constants/roles");
const auth = require("../middlewares/auth");
const checkAccess = require("../middlewares/CheckAccess");
const categoryModel = require("../models/category.model");
const productRouter = express.Router()

// Create a new product and update the category with the product ID
productRouter.post("/create", auth, checkAccess([ROLES.SELLER]), async (req, res) => {
    try {
        const { name, price, dashedPrice, description, image, category } = req.body;

        // Ensure the category name exists
        // const existingCategory = await categoryModel.findOne({name: category});
        let existingCategory = await categoryModel.findOne({ name: { $regex: new RegExp(category, 'i') } });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        // Create the product
        const newProduct = new productModel({ name, price, dashedPrice, description, image, category:existingCategory._id });
        // console.log(newProduct,"getting newProduct")
        const savedProduct = await newProduct.save();

        // Update the category with the new product's ID
        existingCategory.products.push(savedProduct._id);
        await existingCategory.save();

        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// // Get all products
// productRouter.get('/',auth, async (req, res) => {
//     try {
//         const products = await productModel.find().populate('category', 'name');
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Get product by ID
productRouter.get('/:id',auth, async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate('category','name');
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a product (Admin or Seller only)
productRouter.put('/:id', auth, checkAccess([ROLES.SELLER]), async (req, res) => {
    try {
        const { name, price, dashedPrice, description, image, category } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, { name, price, dashedPrice, description, image, category }, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a product (Admin or Seller only)
productRouter.delete('/delete/:id',auth, checkAccess([ROLES.SELLER]) , async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//get with query params 
productRouter.get('/', async (req, res) => {
    try {
        // console.log(req.query)
        //obj fo handelling query params

        //product?sort=name&order=desc
        //product?sort=title&order=desc
        
        //product?name=sweet
        let queryobj = {}
        if (req.query.name) {
            queryobj.name = { $regex: req.query.name, $options: "i" }
        }

        if (req.query.price) {
            queryobj.price = req.query.price
        }

        //obj for handelling sorting
        let sortObj = {};
        if (req.query.sort) { //it gives {sort : rating, order : asc}
            sortObj[req.query.sort] = req.query.order === "asc"? 1 : -1
            //       sort           =  if asc - 1 if desc -1
        }

        const prodData = await productModel.find(queryobj).sort(sortObj)
        // const movieData = await movieModel.find(sortObj).sort
        //also has partial search concept in it (regex)
        res.status(200).json({ msg: prodData })
    } catch (error) {
        res.status(500).json({ error: 'Error finding the Product' })
    }
})

module.exports = productRouter
