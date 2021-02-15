const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join("./images"))); // treba samo ./images

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
}); 
*/

const users = require('./routes/users');
app.use('/users', users);

const books = require('./routes/books');
app.use('/books', books);

const events = require('./routes/events');
app.use('/events', events);

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection; 
//Uspesna konekcija
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});
//Error 
mongoose.connection.on('error', (err) => {
    console.log('DB Error: '+err);
})

app.get('/', (req, res) => res.send("Test")); // 
app.listen(port, () => console.log(`Server is listening on port ${port}`));  