const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const artistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  galleryId: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  name: String, 
  birthYear: Date,
  birthPlace: String,
  image: String,
  caption: String,
  medium: {
    type: String,
    enum: [ 'Painting', 'Sculpture', 'Photography', 'Video Art', 'Performance', 'Drawing', 'Mixed Media']
  },  
  relationship: {
    type: String,
    enum: ['represented', 'works available']
  },
  meta_data: String,
  artwork_min: Number,
  artwork_max: Number,
  editions_min: Number, 
  editions_max: Number,  
  artistBiography: String,  
  mainQuote: String,
})

const Artist = model("Artist", artistSchema)

module.exports = Artist