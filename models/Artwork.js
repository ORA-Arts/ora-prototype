const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist"
  },
  title: String,
  realisationYear: Number, // perhaps date
  type: {
    type: String,
    enum: ["Unique", "Editions"]
  },
  signed: Boolean,
  medium: [{
    type: String,
    enum: [ "Painting", "Sculpture", "Photography", "Video Art", "Performance", "Drawing", "Mixed Media"]
  }],
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