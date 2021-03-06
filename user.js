const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const session = require('express-session');
const update = require('./update')

router.use('/update', update);

router.post('/create', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        let schema = req.body;
        // Create a schema for storing poll data
        schema.username = session.data.user.username;
        schema.views = 0;
        schema.voted = 0;
        schema.upvote = 0;
        schema.comments = [];
        const choices = req.body.choices.map(choice => [choice, 0]);
        schema.choices = choices;
        schema.ips = [];
        schema.date = Date.now();

        const created = new Date();
        const date = created.getDate();
        const month = created.getMonth() + 1;
        const year = created.getFullYear();
        schema.created = `${month}/${date}/${year}`;
        const collection = db.collection('polls');
        collection.insert(schema);
        collection.find({ username: session.data.user.username }).toArray((err, docs) => {
            if (err) console.error(err);
            session.data.mypolls = docs;
        })
        db.close();
    });
    res.redirect('/user/create/successful');
});

router.route('/login')
        .post((req, res) => {
            MongoClient.connect(url, (err, db) => {
                if (err) console.error('There was a problem connecting to database ', err);
                // Check for username and password in db
                db.collection('users').find({
                     username: req.body.username,
                     password: req.body.password
                 }).toArray((err, docs) => {
                     // Work with docs
                     if (err) console.error(err);
                     if (docs.length) {
                         session.data = {};
                         session.data.user = docs[0];
                         db.collection('polls').find({
                             username: req.body.username
                         }).toArray((err, polls) => {
                             if (err) console.error(err);
                             if (polls.length) session.data.mypolls = polls;
                             res.redirect('/user');
                             db.close();
                         })
                     } else {
                         res.redirect('/user/login/error');
                         db.close();
                     };
                 });
            });
        });

router.route('/signup')
        .post((req, res) => {

            MongoClient.connect(url, (err, db) => {
                if (err) console.error('There was a problem connecting to database ', err);
                // Look up db for username and email already taken
                db.collection('users')
                .find({ username: req.body.username })
                .toArray((err, docs) => {
                    if (err) console.error(err);
                    if (docs.length) res.redirect('/user/signup/invalid');
                    else {
                        db.collection('users').find({ email: req.body.email })
                        .toArray((err, docs) => {
                            if (err) console.error(err);
                            if (docs.length) res.redirect('/user/signup/invalid/email');
                            else {
                                const schema = {
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    username: req.body.username,
                                    password: req.body.password,
                                    email: req.body.email
                                };
                                db.collection('users').insert(schema);
                                db.close();
                                session.data = {};
                                session.data.user = schema;
                                res.redirect('/user')
                            }
                        });
                    }
                });
            });
        });

module.exports = router;
