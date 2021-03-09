const { Schema, model } = require("mongoose")



const artistSchema = new Schema({
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String, 
  birthYear: Number,
  birthPlace: String,
  imageUrl: String,
  imgPublicId: String,
  caption: String,

  medium: {
    type: [String],
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
}, { timestamps: true })

const Artist = model("Artist", artistSchema)

module.exports = Artist