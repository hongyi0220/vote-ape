const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = process.env.MONGOLAB_URI;
require('dotenv').config();

// app.use('trust proxy', true);

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
            // console.log('docs:', docs);
            if (docs.length) session.data.duplicate = true;
            else session.data.duplicate = false;

            const duplicate = session.data.duplicate;
            // console.log(`duplicate?: ${duplicate}`);
            // db.close();
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
                // console.log('ip written to database');
                // Save poll id for the purpose of keeping the client on the poll page after voting
                session.data.poll_id = id;
                res.redirect('/polls/poll/done');
                // res.redirect('/polls/poll/successful');
            }
            db.close();
        });
    });

});

module.exports = router;
