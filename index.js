var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-197dnkn3t48agl1wuzpj91l7lo4dkifrzhim8wjf5ykg:0f75c4be5fda84f99a0d4c582ef21b89@3447fb1b-02ae-4331-923a-607d107471ea-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-197dnkn3t48agl1wuzpj91l7lo4dkifrzhim8wjf5ykg";
var password = "0f75c4be5fda84f99a0d4c582ef21b89";
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
//////
/*
  db.insert(data, (err, body, header) => {
      if (err) {
          console.log('Error inserting data:', err);
          res.send('Error inserting data');
      } else {
          console.log('Data inserted successfully:', body);
          res.send('Data inserted successfully');
      }
  });*/
});

/////////////
////////////// insert single document
/*
app.post('/insert-document', function (req, res) {
var id,name,address,phone,age,database_name;
database_name=req.body.db;
id= req.body.id,
        name= req.body.name;
        address= req.body.address;
        phone= req.body.phone;
        age= req.body.age;
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database_name).insert({ "name": name, "address": address, "phone": phone, "age": age }, id , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});
});   
   */
app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



/*
const express = require('express');
const bodyParser = require('body-parser');
const Cloudant = require('@cloudant/cloudant');

const app = express();
const port = 3000;

// Cloudant credentials
const cloudantUsername = 'YOUR_CLOUDANT_USERNAME';
const cloudantPassword = 'YOUR_CLOUDANT_PASSWORD';
const cloudantDatabaseName = 'YOUR_DATABASE_NAME';

// Initialize Cloudant
const cloudant = new Cloudant({
    account: cloudantUsername,
    password: cloudantPassword
});

// Use the database
const db = cloudant.db.use(cloudantDatabaseName);

app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Insert data into Cloudant database
app.post('/insert', (req, res) => {
    const { name, email } = req.body;
    const data = {
        name: name,
        email: email
    };

    db.insert(data, (err, body, header) => {
        if (err) {
            console.log('Error inserting data:', err);
            res.send('Error inserting data');
        } else {
            console.log('Data inserted successfully:', body);
            res.send('Data inserted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

*/
