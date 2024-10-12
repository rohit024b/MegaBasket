const ROLES = require("../constants/roles")
const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkAccess = require("../middlewares/CheckAccess")
const userModel = require("../models/user.model")
const auth = require("../middlewares/auth")


//get all the users only admin can get all the users 
userRouter.get("/", auth, checkAccess([ROLES.ADMIN]), async (req, res) => {
    try {
        const userData = await userModel.find();
        res.status(200).json({ msg: userData })

    } catch (err) {
        res.status(500).send(err)
    }
})

// Register
userRouter.post("/register", async (req, res) => {
    try {
        //destructuring the obj passed in body
        const { name, password, email, phone, city, role } = req.body

        //check if the usrName-Email is already exists in the collection also creating new user
        let newUser = await userModel.findOne({ email });
        let newUserPhone = await userModel.findOne({ phone });

        if (newUser) {
            return res.status(400).send("Email already exists!")
        }
        if (newUserPhone) {
            return res.status(400).send("Phone number already exists!")
        }

        //hash the password the password we getting from the body we need to hash it before saving it to the DB
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        //now we need to assign this password into the usermodel
        newUser = new userModel({ name, password: hashPassword, email, phone, city, role })

        //now will save the crteated user 
        const savedUser = await newUser.save();
        res.status(201).json({ msg: "Registered successfully!", savedUser:savedUser.name })

    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found! Please register")
        }

        //match the password with hashed password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).send("Password is wrong!")
        }

        // create token
        //it accepts                          payload            ,              secret key
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" })
        res.json({ msg: "Logged in successfully", token, userId: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = userRouter