const mongoose = require('mongoose');
const ROLES = require('../constants/roles');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please provide a valid email address'] },
    phone: { type: String, required: true, unique: true, match: [/^\d{10}$/, 'Phone number should be 10 digits'] },
    city: { type: String, required: true },
    role: { type: String, enum: [ROLES.ADMIN, ROLES.SELLER, ROLES.USER], default: ROLES.USER },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
},
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("user", userSchema);