const express = require('express');
const app = express();
const user = require('./user');
const api = require('./api');
const polls = require('./polls');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = process.env.MONGOLAB_URI;
// require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(session({
    secret: 'scaredy-narwhal',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get polls when a client arrives at homepage
app.use('/', (req, res, next) => {

    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        db.collection('polls').find({}).toArray((err, docs) => {
            if (err) console.error(err);
            // If user is already signed-in, no need to define session
            if (session.data) session.data.polls = docs;
            else { // Or else define session
                session.data = {};
                session.data.polls = docs;
            }
        });
        db.close();
        next();
    });
});

app.use(express.static('build'));

app.use('/polls', polls);

app.use('/api', api);

app.use('/user', user);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})
app.listen(port);
