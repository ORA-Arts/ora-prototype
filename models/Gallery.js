const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gallerySchema = new Schema({
  // later
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ownerName: String,
  name: String,
  address: String,
  biography: String,
  position: String,
  imageUrl: String,
  imgPublicId: String,
  website: String,
  convelio: Boolean
}, { timestamps: true });

const Gallery = model("Gallery", gallerySchema);

module.exports = Gallery;