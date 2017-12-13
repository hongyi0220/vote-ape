const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = process.env.MONGOLAB_URI;
require('dotenv').config();

router.post('/poll/vote', (req, res) => {
    const choiceData = req.body.choice.split(',');
    const id = choiceData[0];
    const countsIndex = choiceData[1];
    const update = {}
    update['choices.' + countsIndex + '.1'] = 1;
    update.voted = 1;

    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        db.collection('polls').updateOne(
            {_id: mongo.ObjectId(id)},
            {$inc: update}
        );
        db.close();
        res.redirect('/polls/poll');
        // res.end();
        // res.redirect('/polls/poll/successful');
    });
});

module.exports = router;
