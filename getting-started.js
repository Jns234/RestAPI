const mongoose = require('mongoose');
const Cars = require("./Cars")


mongoose.connect("mongodb://localhost/27017")
async function run(){} 
const car = new Cars({vin: 12, auctions_is: 2})
car.save().then(() => console.log("Car saved"))