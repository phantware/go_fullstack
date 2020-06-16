// MongoDB_Connection: mongodb+srv://phantware:<password>@cluster0-tie57.mongodb.net/<dbname>?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://phantware:jamiu12345@cluster0-tie57.mongodb.net/<dbname>?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('successfully connected to mongodb');
  })
  .catch((err) => {
    console.log('unable to connect to mongodb atlas');
    console.log(err);
  });

const stuffRoute = require('./routes/stuff');
const userRoute = require('./routes/users');

const app = express();
// This will ebable CORS rule
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use(express.json());
app.use('/api/stuff', stuffRoute);
app.use('/api/auth', userRoute);

module.exports = app;
