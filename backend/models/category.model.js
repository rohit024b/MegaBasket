const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    products: [{type: mongoose.Schema.Types.ObjectId, ref:'product'}]
},
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model("category", categorySchema);