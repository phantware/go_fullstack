const mongoose = require('mongoose');

const thinSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, require: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model('Thing', thinSchema);
