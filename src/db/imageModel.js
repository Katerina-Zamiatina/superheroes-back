const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  img: { data: Buffer, contentType: String },
});

const Image = mongoose.model('image', imageSchema);

module.exports = { Image };
