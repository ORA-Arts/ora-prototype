const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  preferredArtists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Confirmed"]
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],
  type: String,
  medium: String,
  buget: Number,
}, { timestamps: true });

const Request = model("Request", requestSchema);

module.exports = Request;