const mongoose = require('mongoose');

const { Schema } = mongoose;

const heroSchema = new Schema({
  nickname: {
    type: String,
    requiered: [true, 'Set nickname for hero'],
    unique: true,
  },
  realName: {
    type: String,
  },
  originDescription: {
    type: String,
  },
  superpowers: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  img: {
    type: String,
  },
});

const Hero = mongoose.model('heroe', heroSchema);

module.exports = {
  Hero,
};
