const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 1 },
    dashedPrice: { type: Number },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
},
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("product", productSchema);