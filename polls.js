const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = process.env.MONGOLAB_URI;
require('dotenv').config();

router.get('/poll/5[a-z0-9]+', (req, res) => {

    const id = req.url.split('/')[2]; // Get the poll_id
    if (session.data) session.data.poll_id = id;
    else session.data = {};
    session.data.poll_id = id; // Put it in session

    // Get polls data
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
        res.redirect('/twitter/redirect');
    });
});

router.post('/poll/vote', (req, res) => {
    const choiceData = req.body.choice.split(',');
    const id = choiceData[0];
    const countsIndex = choiceData[1];
    const ip = req.ip;
    const update = {};
    update['choices.' + countsIndex + '.1'] = 1;
    update.voted = 1;

    // Connect to database
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        const collection = db.collection('polls');
        // Check for duplicate voting
        collection.find(
            {
                _id: mongo.ObjectId(id),
                ips: {$elemMatch: {$eq: ip}}
            }
        ).toArray((err, docs) => {
            if (err) console.error(err);
            if (docs.length) session.data.duplicate = true;
            else session.data.duplicate = false;

            const duplicate = session.data.duplicate;
            if (duplicate) {

                session.data.poll_id = id;
                res.redirect('/polls/poll/voted');
            }
            else { // If first time voting, record ip address, update poll data

                collection.updateOne(
                    {_id: mongo.ObjectId(id)},
                    {$inc: update,
                     $push: {ips: ip}
                    }
                );
                // Save poll id for the purpose of keeping the client on the poll page after voting
                session.data.poll_id = id;
                res.redirect('/polls/poll/done');
            }
            db.close();
        });
    });
});

module.exports = router;
