const express = require('express');
const app = express();
const router = express.Router();
// const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGOLAB_URI;

// app.use(bodyParser.urlencoded({ extended: true }));

router
    .post('/name', (req, res) => {
        mongo.connect(url, (err, db) => {
            if (err) console.error(err);
            const user_id = req.body.user_id;
            db.collection('users')
                .update({
                    _id: {$oid: user_id}
                },
                {
                    fistname: req.body.firstname, lastname: req.body.lastname
                });
            db.close();
        });
    })
    .post('/username', (req, res) => {

    })

module.exports = router;
