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
// router.post('/update/fullname', (req, res) => {
//     MongoClient.connect(url, (err, db) => {
//         if (err) console.error(err);
//         const user_id = req.body.user_id;
//
//         console.log('user_id from server:',user_id);
//         console.log(' fistname from server:',  req.body.firstname);
//
//         db.collection('users').updateOne(
//             {_id: mongo.ObjectId(user_id)},
//             {$set: {firstname: req.body.firstname}}
//         );
//         res.redirect('/user/update/fullname/successful');
//         db.close();
//
//         console.log('name change successful! ');
//     });
// });

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
                         session.user = docs;
                         // console.log(app.get('docs'));
                         res.redirect('/user');

                     } else {
                         // res.send('Oops, something went horribly wrong ;p')
                         res.redirect('/user/login/error')
                     };
                 });
                 db.close();
                 // res.send('login successful!');
            });
            // res.end()

        });

// router.get('/api', (req, res) => {
//     // res.send(app.get('docs'));
//     res.send(session.user);
// });

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
                                session.user = [schema];
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
