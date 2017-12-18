const express = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const session = require('express-session');


router
    .post('/fullname', (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) console.error(err);
            const sessUser = session.data.user;
            const user_id = sessUser._id;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            // Update fullname
            db.collection('users').updateOne(
                {_id: mongo.ObjectId(user_id)},
                {$set: {
                    firstname: firstname,
                    lastname: lastname
                }}
            );
            db.close();
            sessUser.firstname = firstname;
            sessUser.lastname = lastname;
            res.redirect('/user/update/successful');
        });
    })
    .post('/username', (req, res) => {
        const password = req.body.password;
        const sessUser = session.data.user;
        const user_id = sessUser._id;
        const username = req.body.username;

        if (password === sessUser.password) {
            MongoClient.connect(url, (err, db) => {
                if (err) console.error(err);

                    db.collection('users').updateOne(
                        {_id: mongo.ObjectId(user_id)},
                        {
                            $set: {
                                username: username
                            }
                        }
                    );
                    db.close();
                    sessUser.username = username;
                    res.redirect('/user/update/successful');
            });
        } else {
            res.redirect('/user/update/error');
        }

    })
    .post('/email', (req, res) => {
        const password = req.body.password;
        const sessUser = session.data.user;
        const user_id = sessUser._id;
        const email = req.body.email;

        if (password === sessUser.password) {
            MongoClient.connect(url, (err, db) => {
                if (err) console.error(err);
                db.collection('users').updateOne(
                    {_id: mongo.ObjectId(user_id)},
                    {
                        $set: {
                            email: email
                        }
                    }
                );
                db.close();
                sessUser.email = email;
                res.redirect('/user/update/successful');
            });
        } else {
            res.redirect('/user/update/error');
        }
    })
    .post('/password', (req, res) => {
        const sessUser = session.data.user;
        const user_id = sessUser._id;
        const newPassword = req.body.new_password;
        const password = req.body.password;
        if (password === sessUser.password) {

            MongoClient.connect(url, (err, db) => {
                if (err) console.error(err);
                db.collection('users').updateOne(
                    {_id: mongo.ObjectId(user_id)},
                    {
                        $set: {
                            password: newPassword
                        }
                    }
                );
                db.close();
                sessUser.password = newPassword;
                res.redirect('/user/update/successful');
            });
        } else {
            res.redirect('/user/update/error');
        }
    });

module.exports = router;
