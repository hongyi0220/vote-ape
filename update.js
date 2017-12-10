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
            const user_id = req.body.user_id;

            // console.log('user_id from server:',user_id);
            // console.log(' fistname from server:',  req.body.firstname);

            const collection = db.collection('users');
            collection.updateOne(
                {_id: mongo.ObjectId(user_id)},
                {$set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }}
            );
            collection.find({_id: mongo.ObjectId(user_id)})
                .toArray((err, docs) => {
                    if (err) console.error(err);
                    session.user = docs;
                    res.redirect('/user/update/fullname/successful')
                });
            db.close();
        });
    });

module.exports = router;
