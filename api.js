const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const session = require('express-session');
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

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
        // next();
        // res.redirect('/polls/poll/comment');
        // res.redirect('/polls/poll/comment/posted');
        // res.send('hooray');
        res.end();
    });
});

router.get('/getuserdata', (req, res) => {
    // res.send(app.get('docs'));
    // console.log('api asked for: getuserdata: session.data:', session.data);
    // console.log('server: api getuserinfo: req.session.data.user', req.session.data.user);
    res.send(session.data);
});

router.get('/signout', (req, res) => {
    // console.log('heya from /signout');
    session.data.user = null;
    // session.data.user = null;
    res.end();
    // console.log('session.data.user AFTER session is destroyed:', session.data.user);
});

router.post('/upvote', (req,res) => {
    const id = req.body._id;
    // console.log(`req.body._id: ${req.body._id}`);
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

// router.get('/polls', (req, res) => {
//     res.send(session.data.polls);
// })

module.exports = router;
