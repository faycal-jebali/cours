const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const faker = require('faker');
const upload = multer();
const app = express();
const PORT = 3007;

var cors = require('cors');

mongoose.connect('mongodb://souladaUser:Sd01234560@ds119060.mlab.com:19060/coursenligne');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: can\'t connect to DB'));
db.once('open', () => {
    console.log('Connected to DB');
});

const movieShema = mongoose.Schema({
    movietitle: String,
    movieyear: Number
});

const Movie = mongoose.model('Movie', movieShema);
const title = 'Terminator';
const year = 1984;

const myMovie = new Movie({ movietitle: title, movieyear: year });
const userShema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    passeword: String,
    created: String
});

const User = mongoose.model('User', userShema);


const userModel = new User({
    firstname: 'Fayçal',
    lastname: 'Jebali',
    email: 'faycal.jebali1@gmail.com',
    password: '123',
    created: new Date("Y-m-d")
});
/*userModel.save((err, savedUser) => {
    if (err) {
        console.error(err);
    } else {
        console.log('savedUser', savedUser);
    }
});*/
/*myMovie.save((err, savedMovie) => {
    if (err) {
        console.error(err);
    } else {
        console.log('savedMovie', savedMovie);
    }
});*/




// Allow Origin Host
app.use(cors({ origin: 'http://localhost:4200' }));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));


// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
app.use(expressJwt({ secret: secret }).unless({ path: ['/login'] }));
app.use('/public', express.static("public")); //declarer les statiques
app.set(`views`, `./views`); // declarer le dossier des interfaces EJS
app.set(`view engine`, `ejs`);


let users = [];


app.post('/users/login', urlencodedParser, (req, res) => {
    console.log('login post :: ', req.body);
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        // if (fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
        if (true) {
            // iss means 'issuer'
            const myToken = jwt.sign({ iss: 'http://localhost:3007', user: 'Faycal', role: 'admin' }, secret);
            console.log('myToken', myToken);

            res.json(myToken);
        } else {
            res.sendStatus(401);
        }
    }
});

//Home
app.get('/', function(req, res) {
    res.render(`index`);
});

//Login
// app.get('/login', function(req, res) {
//     res.render(`login`);
// });

//Get Register
app.get('/register', function(req, res) {
    users = [
        { email: 'email1@provider.com' },
        { email: 'email2@provider.com' },
        { email: 'email3@provider.com' }
    ];
    res.render(`register`, { users: users });
});

//Post Register
app.post('/register', urlencodedParser, function(req, res) {
    console.log(req.body);
    const newUser = { email: req.body.email };
    users = [...users, newUser];
    res.sendStatus(201);
    res.render(`register`, { users: users });
});

app.get('/category/:id/:title', function(req, res) {
    const id = req.params.id;
    const title = req.params.title;
    const list = [];
    for (var i = 0; i < 10; i++) {
        list.push({
            id: 'crs ' + i,
            title: 'Course ' + i,
            author: 'Faycal Jebal 1',
            imagePath: 'assets/images/slider1.jpg',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
            price: '25€'
        });
    }
    res.send(list);
});

app.get('/category', function(req, res) {
    const categories = [];
    for (var i = 0; i < 5; i++) {
        categories.push({
            id: 'c ' + i,
            title: 'Category ' + i,
            iconPath: 'assets/images/slider1.jpg',
            imagePath: 'assets/images/slider1.jpg',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
            underCategories: [{
                    id: 'uc ' + i + '1',
                    title: i + ' - Under Category 1',
                    iconPath: 'assets/images/slider1.jpg',
                    imagePath: 'assets/images/slider1.jpg',
                    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
                },
                {
                    id: 'uc ' + i + '2',
                    title: i + ' - Under Category 2',
                    iconPath: 'assets/images/slider1.jpg',
                    imagePath: 'assets/images/slider1.jpg',
                    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
                },
                {
                    id: 'uc ' + i + '3',
                    title: i + '- Under Category 3',
                    iconPath: 'assets/images/slider1.jpg',
                    imagePath: 'assets/images/slider1.jpg',
                    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
                }
            ]
        });
    }
    res.send(categories);
});

app.get('/category/add', function(req, res) {
    res.send('<h1>Add Category</h1><p>--Formulaire will be here!--</p>');
});

app.get('/category/:id', function(req, res) {
    const id = req.params.id
    res.send(`<h1>Category ${id}</h1><p>List of Course category ${id}</p>`);
});

app.get('/course1', function(req, res) {
    res.send('Listing of Course 1');
});

app.get('/course2', function(req, res) {
    res.send('Listing of Course 2');
});

app.listen(PORT, function() {
    console.log(`listing on port ${PORT}`);
});


app.get('/login', (req, res) => {
    res.render('login', { title: 'Connexion' });
});

const fakeUser = { email: 'faycal.jebali1@gmail.com', password: '123' };

app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body);
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        if (fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
            // iss means 'issuer'
            const myToken = jwt.sign({ iss: 'http://localhost:3007', user: 'Faycal', role: 'admin' }, secret);
            console.log('myToken', myToken);
            res.json(myToken);
            // res.json({
            //     email: 'testuser@testmail.fr',
            //     favoriteMovie: 'Il etait une fois dans l\'Ouest',
            //     favoriteMovieTheater: 'Ciné TNB, 1 Rue Saint-Hélier, 35040 Rennes',
            //     lastLoginDate: new Date()
            // });
        } else {
            res.sendStatus(401);
        }
    }
});