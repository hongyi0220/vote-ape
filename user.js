// User route module
const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const session = require('express-session');
const bodyParser = require('body-parser');
const update = require('./update')

app.use(bodyParser.json());

router.use('/update', update);

router.post('/create', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        let schema = req.body;
        // console.log('schema', schema);
        // console.log('session.data.user', session.data.user);
        schema.user = session.data.user.username;
        db.collection('polls').insert(schema);
        db.close();
    });
    res.redirect('/user/create/successful');
});

router.route('/login')
        .post((req, res) => {
            MongoClient.connect(url, (err, db) => {
                if (err) console.error('There was a problem connecting to database ', err);
                db.collection('users').find({
                     username: req.body.username,
                     password: req.body.password
                 }).toArray((err, docs) => {
                     // Work with docs
                     if (err) console.error(err);
                     // console.log('docs.length:', docs.length);
                     if (docs.length) {
                         // app.set('docs', docs);
                         session.data = {};
                         session.data.user = docs[0];
                         // console.log(app.get('docs'));
                         // res.redirect('/user');
                     } else {
                         // res.send('Oops, something went horribly wrong ;p')
                         res.redirect('/user/login/error')
                     };
                 });
                 db.collection('polls').find({
                     username: req.body.username
                 }).toArray((err, docs) => {
                     if (err) console.error(err);
                     if (docs.length) session.data.mypolls = docs;
                     res.redirect('/user');
                 })
                 db.close();
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
                    // console.log(docs);
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
                                // app.set('docs', [schema]);
                                // res.send('Sign-up successful!');
                                res.redirect('/user')
                            }
                        });
                    }
                });
            });
        });

module.exports = router;
