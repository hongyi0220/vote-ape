// User route module
const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// router.route('/')
//         .get((req, res) => {
//             res.send('ok')
//         });
router.route('/login')
        .post((req, res) => {
            mongo.connect(url, (err, db) => {
                if (err) console.error('There was a problem connecting to database ', err);
                db.collection('users').find({
                     user_username: req.body.user_username,
                     user_password: req.body.user_password
                 }).toArray((err, docs) => {
                     // Work with docs
                     if (err) console.error(err);
                     // console.log('docs.length:', docs.length);
                     if (docs.length) {
                         app.set('docs', docs);
                         // console.log(app.get('docs'));
                         res.redirect('/user');

                     } else res.redirect('/user/login/error');
                 });
                 db.close();
                 // res.send('login successful!');
            })
            // res.end()

        })
        // .get((req, res) => {
        //     res.send(app.get('docs'));
        // })

router.get('/api', (req, res) => {
    res.send(app.get('docs'));
});

router.route('/signup')
        .post((req, res) => {

            mongo.connect(url, (err, db) => {
                if (err) console.error('There was a problem connecting to database ', err);
                // Look up db for username and email already taken
                db.collection('users')
                .find({ user_username: req.body.user_username })
                .toArray((err, docs) => {
                    // console.log(docs);
                    if (err) console.error(err);
                    if (docs.length) res.redirect('/user/signup/invalid');
                    else {
                        db.collection('users').find({ user_email: req.body.user_email })
                        .toArray((err, docs) => {
                            if (err) console.error(err);
                            if (docs.length) res.redirect('/user/signup/invalid/email');
                            else {
                                db.collection('users')
                                .insert({
                                    user_firstname: req.body.user_firstname,
                                    user_lastname: req.body.user_lastname,
                                    user_username: req.body.user_username,
                                    user_password: req.body.user_password,
                                    user_email: req.body.user_email
                                });
                                db.close();
                                res.send('signup successful!');
                            }
                        });
                    }
                });
            });
        });

module.exports = router;
