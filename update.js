const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));

router
    .post('/fullname', (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) console.error(err);
            // const user_id = req.body.user_id;
            const sessUser = session.data.user;
            const user_id = sessUser._id;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
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
        // console.log('req.body: ',req.body.password);
        const password = req.body.password;

        const sessUser = session.data.user;
        const user_id = sessUser._id;
        const username = req.body.username;

        // console.log(password);
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
        // console.log('post: password reached!');
        if (password === sessUser.password) {
            // console.log('password Match!');
            // console.log(`sessPassword: ${sessUser.password}, password: ${password}, newpswrd: ${newPassword}`);
            MongoClient.connect(url, (err, db) => {
                if (err) console.error(err);
                // console.log('mongodb connected');
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
