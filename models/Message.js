const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = model("Request", messageSchema);

module.exports = Message;