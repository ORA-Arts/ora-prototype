const { Schema, model } = require("mongoose")

const artistSchema = new Schema({
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
    enum: [ 'Painting', 'Sculpture', 'Photography', 'Video Art', 'Performance', 'Drawing', 'Mixed Media'],
    default: 'Painting'

  },  
  relationship: {
    type: String,
    enum: ['represented', 'works available'],
    default: 'represented'
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