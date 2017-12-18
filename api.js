const express = require('express');
const app = express();
const router = express.Router();
// require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const session = require('express-session');

router.post('/comment', (req, res, next) => {
    const comment = req.body.comment;
    const username = req.body.username;
    const id = req.body.poll_id;
    console.log('comment:',comment,'username:',username,'poll_id:',id);
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        db.collection('polls').updateOne(
            {_id: mongo.ObjectId(id)},
            {
                $push: {
                    comments: [username, comment]
                }
            }
        );
        db.close();
        res.end();
    });
});

router.get('/getuserdata', (req, res) => {
    res.send(session.data);
});

router.get('/signout', (req, res) => {
    session.data.user = null;
    res.end();
});

router.post('/upvote', (req,res) => {
    const id = req.body._id;
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        db.collection('polls').updateOne(
            {_id: mongo.ObjectId(id)},
            {
                $inc: {
                    upvote: 1
                }
            }
        );
        db.close();
        res.end();
    });
})

module.exports = router;
