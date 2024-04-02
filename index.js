var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-12z8jyk91c166b5719im5zpx731mpdk45imsugkbkenl:0284cd7f034f3bb3e65dfcbb51376ca1@f8b66c9a-c17a-482c-8427-89caebdb50e3-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-12z8jyk91c166b5719im5zpx731mpdk45imsugkbkenl";
var password = "0284cd7f034f3bb3e65dfcbb51376ca1";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, database } = req.body;
  
  const data = {
      name: name,
      email: email
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



