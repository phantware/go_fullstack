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

const Thing = require('./models/thing');

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

app.post('/api/stuff', (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.get('/api/stuff/:id', (req, res) => {
  Thing.findOne({ _d: req.params.id })
    .then((thing) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

app.put('/api/stuff/:id', (req, res) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({ message: 'Thing updated successfully' });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// My Endpoints
app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = app;
