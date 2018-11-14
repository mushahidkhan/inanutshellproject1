
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
  
  const account = await steem.api.getAccountsAsync([ username ])
  console.log(account)

  if(account.length > 0) {
    const pubKey = account[0].posting.key_auths[0][0]
    var imageUrl = ""
    var a = account[0].json_metadata
    if(JSON.parse(account[0].json_metadata)['profile']) {
      imageUrl = JSON.parse(account[0].json_metadata)['profile']['profile_image']

    }
  const { posting } = steem.auth.getPrivateKeys(username, password, ['posting'])
  const isValid = steem.auth.wifIsValid(posting, pubKey)
  if (isValid) {
    jwt.sign({ username }, hmac, (err, token) => {
      if (err) {
          throw err 
          }
        firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
          if(!snapshot.val()) {
            firebase.database().ref('users').child(username).set({
                privatePostingKey: posting,
                latestPostPermlinkIdNumber: 0,
                likedPosts: ""
            });
          } 
        });
         res.send({ token, posting, username, imageUrl
        })
      })

    } else {
      res.send({error: "Password incorrect. Please try again."})
    }
  }

  else {
    res.send({error: "Username not found. Please try another username"})
  }
  
})

app.post('/postContent', verifyToken, (req, res) => {
   jwt.verify(req.token, hmac, (err, auth) => {
    if (err) { res.sendStatus(403, { err }) }
    firebase.database().ref('/users/' + auth['username']).once('value').then(function(snapshot) {
      if(snapshot.val()) {
        var privatePostingKey = snapshot.val().privatePostingKey
        var latestPostPermlinkIdNumber = snapshot.val().latestPostPermlinkIdNumber
        latestPostPermlinkIdNumber++
        var postTitle = req.body.postTitle
        var postContent = req.body.postContent
         steem.broadcast.comment(
          privatePostingKey,
          "",
          "heroeshonds",
          auth['username'], 
          auth['username'] + "manamherozz12d3" , 
          postTitle, 
          postContent, {tags:["heroeshonds"]}, (error, results) => {
            if(!error) {
                res.json({ result: "success" })
            } else {
              res.json(error)
            }
          } 
        )
      } 
    });
  })
})
app.listen(3001, () => console.log('Listening on port 3001.'))


