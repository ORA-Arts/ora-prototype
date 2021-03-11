const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'Collector'
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  sender: {
    type: String,
    enum: ["Collector", "Gallery"]
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = model("Message", messageSchema);

module.exports = Message;