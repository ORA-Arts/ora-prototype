const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const artworkSchema = new Schema({
  // later
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  title: String,
  realisationYear: Number, // perhaps date
  type: {
    type: String,
    enum: ["Unique", "Editions"]
  },
  signed: Boolean,
  medium: {
    type: String,
    enum: [ "Painting", "Sculpture", "Photography", "Video Art", "Performance", "Drawing", "Mixed Media"]
  },
  materialsAndTechnique: String,
  height: Number,
  length: Number,
  width: Number,
  stockNumber: Number,
  status: {
    type: String,
    enum: ["Available", "Offered", "Sold"]
  },
  market: {
    type: String,
    enum: ["Primary", "Secondary"]
  },
  seller: String,
  price: Number,
  seeInPerson: Boolean,
  location: String,
  description: String,
  images: [{
    imageUrl: String,
    imgPublicId: String
  }],

}, { timestamps: true });

const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;