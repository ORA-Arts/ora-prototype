const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'Collector'
  },
  // preferredArtists: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Artist'
  // }],
  preferredArtist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Confirmed"],
    default: "Pending"
  },
  offeredArtwork: {
    type: Schema.Types.ObjectId,
    ref: "Artwork"
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],
  suggestion: Boolean,
  type: String,
  medium: String,
  budget: Number,
}, { timestamps: true });

const Request = model("Request", requestSchema);

module.exports = Request;