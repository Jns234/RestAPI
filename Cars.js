const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
    users_id: Number,
    category_id: Number,
    auctions_id: Number,
    listings_id: Number,
    vin: Number
})

module.exports = mongoose.model("Cars", carsSchema)