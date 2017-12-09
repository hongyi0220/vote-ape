// User route module
const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;

const bodyParser = require('body-parser');
// const update = require('./update')

app.use(bodyParser.json());

// router.route('/')
//         .get((req, res) => {
//             res.send('ok')
//         });

// router.use('/update', update);
router.post('/update/fullname', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) console.error(err);
        const user_id = req.body.user_id;

        console.log('user_id from server:',user_id);
        console.log(' fistname from server:',  req.body.firstname);

        // let updateNamePromise = new Promise((resolve, reject) => {
        //     db.collection('users').updateOne(
        //         {firstname: req.body.firstname},
        //         {$set: {firstname: req.body.firstname, lastname: req.body.lastname} },
        //         function (err, object) {
        //             err ? reject(err.message) : resolve();
        //         });
        // });
        // updateNamePromise
        // .then(() => res.redirect('/user/update/fullname/successful'))
        // .catch(e => console.error(e));

        db.collection('users').updateOne(
            {_id: mongo.ObjectId(user_id)},
            {$set: {firstname: req.body.firstname}}
        );
        res.redirect('/user/update/fullname/successful');
        db.close();

        console.log('name change successful! ');
    });

    // res.end();
})
// router.get('/update/fullname/successful', (req, res) => {
//     // setTimeout(() => res.redirect('/user'), 2000)
//     res.redirect('/user')
//
// })
// .post('/username', (req, res) => {
//
// })

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
                         app.set('docs', docs);
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
        // .get((req, res) => {
        //     res.send(app.get('docs'));
        // })

router.get('/api', (req, res) => {
    res.send(app.get('docs'));
});

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
                                db.collection('users')
                                .insert(schema);
                                db.close();
                                app.set('docs', [schema]);
                                // res.send('Sign-up successful!');
                                res.redirect('/user')
                            }
                        });
                    }
                });
            });
        });

module.exports = router;
