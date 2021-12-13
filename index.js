const express = require('express');
const app = express();

app.use(express.json())

const cars = [{
    id: 0,
    make: "vw",
    model: "passat"
},{
    id: 1,
    make: "fiat",
    model: "doblo"
},{
    id: 2,
    make: "audi",
    model: "a 4"
}];

app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.get('/api/cars', (req, res)=>{
    res.send(cars)
})

app.get('/api/cars/:id', (req, res)=>{
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) res.status(404)
    res.send(car)
})

app.post('/api/cars', (req, res)=>{
    const car ={
        id: cars.length,
        make: req.body.make,
        model: req.body.model
    };
    res.send(car); 
})

app.put('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    car.make = req.body.make;

    res.send(car);
})

app.delete('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    const index = cars.indexOf(car);
    cars.splice(index, 1)

    res.send(car);
})


app.listen(3000, ()=> console.log('listening on 3000'))