const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const cars = require("./models/cars.json")
const models = require("./models/models.json")
const auctions = require("./models/auctions.json")
const brands = require("./models/brands.json")
const category_details = require("./models/category_details.json")
const categories = require("./models/categories.json")
const listings = require("./models/listings.json")
const users = require("./models/users.json")

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Cars api",
            description: "Cars API Information",
            
            server: ["http://localhost:3000"]
        }
    },
    // ['.routes/*js']
    apis: ["index.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json())



// Routes

app.get('/', (req, res) => {
    res.send('Hello world')
})
/**
 * @swagger
 * tags:
 *  name: Cars
 *  description: API calls to manage cars
 *  
 */

/** 
* @swagger
* /api/cars:
*   get:
*       tags: [Cars]
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
*       tags: [Cars]
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
*       tags: [Cars]
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
        users_id: req.body.users_id,
        category_details_id: req.body.category_details_id,
        auctions_id: req.body.auctions_id,
        listings_id: req.body.listings_id,
        vin: req.body.vin
    };
    res.send(car);
})
/** 
* @swagger
* /api/cars/{id}:
*   put:
*       tags: [Cars]
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

    
        car.users_id = req.body.users_id
        car.category_details_id= req.body.category_details_id
        car.auctions_id= req.body.auctions_id
        car.listings_id= req.body.listings_id
        car.vin= req.body.vin
    

    res.send(car);
})
/** 
* @swagger
* /api/cars/{id}:
*   delete:
*       tags: [Cars]
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
// Models ====================================================================================================================

/**
 * @swagger
 * tags:
 *  name: Models
 *  description: API calls to manage models
 *  
 */

/** 
* @swagger
* /api/models:
*   get:
*       tags: [Models]
*       description: Use to request all models
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/models', (req, res) => {
    res.send(models)
})

/** 
* @swagger
* /api/models/{id}:
*   get:
*       tags: [Models]
*       description: Use to request a model by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Model was not found 
*
*/
app.get('/api/models/:id', (req, res) => {
    const model = models.find(c => c.id === parseInt(req.params.id));
    if (!model) res.status(404)
    res.send(model)
})
/** 
* @swagger
* /api/models:
*   post:
*       tags: [Models]
*       description: Use to post a new model
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Model was not posted 
*
*/
app.post('/api/models', (req, res) => {
    const model = {
        id: models.length,
        model_name: req.body.model_name,
        cars_id: req.body.cars_id
    };
    res.send(model);
})
/** 
* @swagger
* /api/models/{id}:
*   put:
*       tags: [Models]
*       description: Use to update a model by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: model was not found 
*
*/
app.put('/api/models/:id', (req, res) => {
    const model = models.find(c => c.id === parseInt(req.params.id));

    
        model.model_name = req.body.model_name
        model.cars_id= req.body.cars_id

    res.send(model);
})
/** 
* @swagger
* /api/models/{id}:
*   delete:
*       tags: [Models]
*       description: Use to delete a model by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Model was not found 
*
*/
app.delete('/api/models/:id', (req, res) => {
    const model = models.find(c => c.id === parseInt(req.params.id));

    const index = models.indexOf(model);
    models.splice(index, 1)

    res.send(model);
})


// Auctions ====================================================================================================================

/**
 * @swagger
 * tags:
 *  name: Auctions
 *  description: API calls to manage Auctions
 *  
 */

/** 
* @swagger
* /api/auctions:
*   get:
*       tags: [Auctions]
*       description: Use to request all auctions
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/auctions', (req, res) => {
    res.send(auctions)
})

/** 
* @swagger
* /api/auctions/{id}:
*   get:
*       tags: [Auctions]
*       description: Use to request a auction by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Auction was not found 
*
*/
app.get('/api/auctions/:id', (req, res) => {
    const auction = auctions.find(c => c.id === parseInt(req.params.id));
    if (!auction) res.status(404)
    res.send(auction)
})
/** 
* @swagger
* /api/auctions:
*   post:
*       tags: [Auctions]
*       description: Use to post a new auction
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Auction was not posted 
*
*/
app.post('/api/auctions', (req, res) => {
    const auction = {
        id: auctions.length,
        users_id: req.body.users_id,
        starting_date: req.body.starting_date,
        ending_date: req.body.ending_date,
        price: req.body.price,
        bids: req.body.bids,
        description: req.body.description
    };
    res.send(auction);
})
/** 
* @swagger
* /api/auctions/{id}:
*   put:
*       tags: [Auctions]
*       description: Use to update an auction by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Auction was not found 
*
*/
app.put('/api/auctions/:id', (req, res) => {
    const auction = auctions.find(c => c.id === parseInt(req.params.id));

    
        auction.users_id = req.body.users_id
        auction.starting_date= req.body.starting_date
        auction.ending_date= req.body.ending_date
        auction.price= req.body.price
        auction.bids= req.body.bids
        auction.description= req.body.description
    

    res.send(auction);
})
/** 
* @swagger
* /api/auctions/{id}:
*   delete:
*       tags: [Auctions]
*       description: Use to delete an auction by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Auction was not found 
*
*/
app.delete('/api/auctions/:id', (req, res) => {
    const auction = auctions.find(c => c.id === parseInt(req.params.id));

    const index = auctions.indexOf(auction);
    auctions.splice(index, 1)

    res.send(auction);
})

// Category Details ====================================================================================================================


/**
 * @swagger
 * tags:
 *  name: Category Details
 *  description: API calls to manage Category Details
 *  
 */

/** 
* @swagger
* /api/category_details:
*   get:
*       tags: [Category Details]
*       description: Use to request all Category Details
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/category_details', (req, res) => {
    res.send(category_details)
})

/** 
* @swagger
* /api/category_details/{id}:
*   get:
*       tags: [Category Details]
*       description: Use to request a Category Detaisl by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category Detail was not found 
*
*/
app.get('/api/category_details/:id', (req, res) => {
    const category_detail = category_details.find(c => c.id === parseInt(req.params.id));
    if (!category_detail) res.status(404)
    res.send(category_detail)
})
/** 
* @swagger
* /api/category_details:
*   post:
*       tags: [Category Details]
*       description: Use to post a new Category Detail
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Category Detail was not posted 
*
*/
app.post('/api/category_details', (req, res) => {
    const category_detail = {
        id: category_details.length,
        type: req.body.type    };
    res.send(category_detail);
})
/** 
* @swagger
* /api/category_details/{id}:
*   put:
*       tags: [Category Details]
*       description: Use to update a Category Detail by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category Detail was not found 
*
*/
app.put('/api/category_details/:id', (req, res) => {
    const category_detail = category_details.find(c => c.id === parseInt(req.params.id));

    
        category_detail.type= req.body.type

    res.send(category_detail);
})
/** 
* @swagger
* /api/category_details/{id}:
*   delete:
*       tags: [Category Details]
*       description: Use to delete a Category Detail by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category Detail was not found 
*
*/
app.delete('/api/category_details/:id', (req, res) => {
    const category_detail = category_details.find(c => c.id === parseInt(req.params.id));

    const index = category_details.indexOf(category_detail);
    category_details.splice(index, 1)

    res.send(category_detail);
})


// Brands ====================================================================================================================


/**
 * @swagger
 * tags:
 *  name: Brands
 *  description: API calls to manage Brands
 *  
 */

/** 
* @swagger
* /api/brands:
*   get:
*       tags: [Brands]
*       description: Use to request all brands
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/brands', (req, res) => {
    res.send(brands)
})

/** 
* @swagger
* /api/brands/{id}:
*   get:
*       tags: [Brands]
*       description: Use to request a brand by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Brand was not found 
*
*/
app.get('/api/brands/:id', (req, res) => {
    const brand = brands.find(c => c.id === parseInt(req.params.id));
    if (!brand) res.status(404)
    res.send(brand)
})
/** 
* @swagger
* /api/brands:
*   post:
*       tags: [Brands]
*       description: Use to post a new brand
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Brand was not posted 
*
*/
app.post('/api/brands', (req, res) => {
    const brand = {
        id: auctions.length,
        brand_name: req.body.brand_name,
        models_id: req.body.models_id
    };
    res.send(brand);
})
/** 
* @swagger
* /api/brands/{id}:
*   put:
*       tags: [Brands]
*       description: Use to update a Brand by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Brand was not found 
*
*/
app.put('/api/brands/:id', (req, res) => {
    const brand = brands.find(c => c.id === parseInt(req.params.id));

    
        brand.brand_name = req.body.brand_name
        brand.models_id= req.body.models_id

    res.send(brand);
})
/** 
* @swagger
* /api/brands/{id}:
*   delete:
*       tags: [Brands]
*       description: Use to delete a brand by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Brand was not found 
*
*/
app.delete('/api/brands/:id', (req, res) => {
    const brand = brands.find(c => c.id === parseInt(req.params.id));

    const index = brands.indexOf(brand);
    brands.splice(index, 1)

    res.send(brand);
})

// Category ====================================================================================================================


/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: API calls to manage Categories
 *  
 */

/** 
* @swagger
* /api/categories:
*   get:
*       tags: [Categories]
*       description: Use to request all Categories
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/categories', (req, res) => {
    res.send(categories)
})

/** 
* @swagger
* /api/categories/{id}:
*   get:
*       tags: [Categories]
*       description: Use to request a category by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category was not found 
*
*/
app.get('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) res.status(404)
    res.send(category)
})
/** 
* @swagger
* /api/categories:
*   post:
*       tags: [Categories]
*       description: Use to post a new category
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Category was not posted 
*
*/
app.post('/api/categories', (req, res) => {
    const category = {
        id: categories.length,
        category_details_id: req.body.category_details_id,
        value: req.body.value
    };
    res.send(category);
})
/** 
* @swagger
* /api/categories/{id}:
*   put:
*       tags: [Categories]
*       description: Use to update a Category by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category was not found 
*
*/
app.put('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));

    
        categories.category_details_id = req.body.category_details_id
        categories.value= req.body.value

    res.send(category);
})
/** 
* @swagger
* /api/categories/{id}:
*   delete:
*       tags: [Categories]
*       description: Use to delete a Category by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Category was not found 
*
*/
app.delete('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));

    const index = categories.indexOf(category);
    categories.splice(index, 1)

    res.send(category);
})


// Listings ====================================================================================================================

/**
 * @swagger
 * tags:
 *  name: Listings
 *  description: API calls to manage Listings
 *  
 */

/** 
* @swagger
* /api/listings:
*   get:
*       tags: [Listings]
*       description: Use to request all Listings
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/listings', (req, res) => {
    res.send(listings)
})

/** 
* @swagger
* /api/listings/{id}:
*   get:
*       tags: [Listings]
*       description: Use to request a listing by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Listing was not found 
*
*/
app.get('/api/listings/:id', (req, res) => {
    const listing = listings.find(c => c.id === parseInt(req.params.id));
    if (!listing) res.status(404)
    res.send(listing)
})
/** 
* @swagger
* /api/listings:
*   post:
*       tags: [Listings]
*       description: Use to post a new Listing
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: Listing was not posted 
*
*/
app.post('/api/listings', (req, res) => {
    const listing = {
        id: listings.length,
        users_id: req.body.users_id,
        starting_date: req.body.starting_date,
        ending_date: req.body.ending_date,
        price: req.body.price,
        changed_price: req.body.changed_price,
        description: req.body.description
    };
    res.send(listing);
})
/** 
* @swagger
* /api/listings/{id}:
*   put:
*       tags: [Listings]
*       description: Use to update a Listing by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Listing was not found 
*
*/
app.put('/api/listings/:id', (req, res) => {
    const listing = listings.find(c => c.id === parseInt(req.params.id));

    
        listings.users_id = req.body.users_id
        listings.starting_date= req.body.starting_date
        listings.ending_date= req.body.ending_date
        listings.price= req.body.price
        listings.changed_price= req.body.changed_price
        listings.description= req.body.description
    

    res.send(listing);
})
/** 
* @swagger
* /api/listings/{id}:
*   delete:
*       tags: [Listings]
*       description: Use to delete a Listing by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: Listing was not found 
*
*/
app.delete('/api/listings/:id', (req, res) => {
    const listing = listings.find(c => c.id === parseInt(req.params.id));

    const index = listings.indexOf(listing);
    listings.splice(index, 1)

    res.send(listing);
})


// Users ====================================================================================================================


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API calls to manage Users
 *  
 */

/** 
* @swagger
* /api/users:
*   get:
*       tags: [Users]
*       description: Use to request all Users
*       responses:
*           '200':
*              description: A successful response
*
*/
app.get('/api/users', (req, res) => {
    res.send(users)
})

/** 
* @swagger
* /api/users/{id}:
*   get:
*       tags: [Users]
*       description: Use to request a User by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: User was not found 
*
*/
app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404)
    res.send(user)
})
/** 
* @swagger
* /api/users:
*   post:
*       tags: [Users]
*       description: Use to post a new User
*       responses:
*           '200':
*              description: A successful response
*           '500':
*              description: User was not posted 
*
*/
app.post('/api/users', (req, res) => {
    const user= {
        id: users.length,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        phone_num: req.body.phone_num,
        sign_token: req.body.sign_token
    };
    res.send(user);
})
/** 
* @swagger
* /api/users/{id}:
*   put:
*       tags: [Users]
*       description: Use to update an User by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: User was not found 
*
*/
app.put('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    
        users.first_name = req.body.first_name
        users.last_name= req.body.last_name
        users.mail= req.body.mail
        users.phone_num= req.body.phone_num
        users.sign_token= req.body.sign_token

    res.send(user);
})
/** 
* @swagger
* /api/users/{id}:
*   delete:
*       tags: [Users]
*       description: Use to delete an User by id
*       parameters:
*          - in: path
*            name: id 
*       responses:
*           '200':
*              description: A successful response
*           '404':
*               description: User was not found 
*
*/
app.delete('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    const index = users.indexOf(user);
    users.splice(index, 1)

    res.send(user);
})









app.listen(3000, () => console.log('listening on 3000'))