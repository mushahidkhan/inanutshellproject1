
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const steem = require('steem');
const firebase = require("firebase");
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const config = {
  apiKey: "AIzaSyCx6BGDtMLuoqn0ME3gyxZ9kzB_wa5-9hY",
  authDomain: "inanutshell-6edd9.firebaseapp.com",
  databaseURL: "https://inanutshell-6edd9.firebaseio.com",
  projectId: "inanutshell-6edd9",
  storageBucket: "inanutshell-6edd9.appspot.com",
  messagingSenderId: "947989849676"
};

firebase.initializeApp(config);

var secret = require("./private.json")['secret'];
var currentDate = Date.now();
var secretWithDate = secret;
const hmac = crypto.createHash('sha256').update(secretWithDate).digest('hex');

function verifyToken(req, res, next) {
  console.log(req.headers['authorization'])
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    req.token = bearer[1]
     next()
  } else {
    res.sendStatus(403)
  }
}

app.post('/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log("this is " + username);
  const account = await steem.api.getAccountsAsync([ username ])
  const pubKey = account[0].posting.key_auths[0][0]

  var a = account[0].json_metadata
  const imageUrl = JSON.parse(account[0].json_metadata)['profile']['profile_image']
 console.log(account)
  const { posting } = steem.auth.getPrivateKeys(username, password, ['posting'])
  const isValid = steem.auth.wifIsValid(posting, pubKey)
  if (isValid) {
    jwt.sign({ username }, hmac, (err, token) => {
      if (err) {
        console.log('error')
        throw err 
        }
      firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
        if(!snapshot.val()) {
          firebase.database().ref('users').child(username).set({
            username: {
              privatePostingKey: posting,
              latestPostPermlinkIdNumber: 0,
              likedPosts: ""
            }
          });
        } 
      });
       res.send({ token, posting, username, imageUrl
      })
    })

  } else {
    res.sendStatus(403)
  }
})

app.post('/postContent', verifyToken, (req, res) => {
  console.log("in post " + req.body.postTitle)
   jwt.verify(req.token, hmac, (err, auth) => {
    if (err) { res.sendStatus(403, { err }) }
      console.log(auth)
    firebase.database().ref('/users/' + auth['username']).once('value').then(function(snapshot) {
      if(snapshot.val()) {
        var privatePostingKey = snapshot.val().privatePostingKey
        var latestPostPermlinkIdNumber = snapshot.val().latestPostPermlinkIdNumber
        latestPostPermlinkIdNumber++
        var postTitle = req.body.postTitle
        var postContent = req.body.postContent
        console.log(auth['username'] + " " + latestPostPermlinkIdNumber + " " + postTitle + postContent)
         steem.broadcast.comment(
          privatePostingKey, "", auth['username'] + latestPostPermlinkIdNumber, auth['username'],"testinl" , postTitle, postContent, {}, (error, results) => {
            if(!error) {
              console.log(results)
            } else {
              console.log(error)
            }
          } 
        )
      } 
    });
    res.json({ result: "success" })
  })
})
app.listen(3001, () => console.log('Listening on port 3001.'))


