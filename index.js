const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Cars api",
            description: "Cars API Information",
            cars: {
                make: "vw"
            },
            server: ["http://localhost:3000"]
        }
    },
    // ['.routes/*js']
    apis: ["index.js"]
};



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json())
const cars = [{
    id: 0,
    make: "vw",
    model: "passat"
}, {
    id: 1,
    make: "fiat",
    model: "doblo"
}, {
    id: 2,
    make: "audi",
    model: "a 4"
}];

// Routes

app.get('/', (req, res) => {
    res.send('Hello world')
})
/** 
* @swagger
* /api/cars:
*   get:
*       description: Use to request all cars
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/cars', (req, res) => {
    res.send(cars)
})
/** 
* @swagger
* /api/cars/{id}:
*   get:
*       description: Use to request a car by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Car was not found 
*
*/
app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) res.status(404)
    res.send(car)
})
/** 
* @swagger
* /api/cars:
*   post:
*       description: Use to post a new car
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Car was not posted 
*
*/
app.post('/api/cars', (req, res) => {
    const car = {
        id: cars.length,
        make: req.body.make,
        model: req.body.model
    };
    res.send(car);
})
/** 
* @swagger
* /api/cars/{id}:
*   put:
*       description: Use to update a car by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Car was not found 
*
*/
app.put('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    car.make = req.body.make;

    res.send(car);
})
/** 
* @swagger
* /api/cars/{id}:
*   delete:
*       description: Use to delete a car by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Car was not found 
*
*/
app.delete('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    const index = cars.indexOf(car);
    cars.splice(index, 1)

    res.send(car);
})


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/api/api-docs'));
  });

app.listen(3000, () => console.log('listening on 3000'))