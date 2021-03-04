const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gallerySchema = new Schema({
  name: String,
  address: String,
  biography: String,
  position: String,
  image: String,
  website: String,
  convelio: Boolean
});

const Gallery = model("Gallery", gallerySchema);

module.exports = Gallery;