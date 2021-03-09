const { Schema, model } = require("mongoose");

const behaviours = Object.freeze({
  new: 'I am a New Collector',
  rarely: 'Rarely (once per year)',
  regular: 'Regularly (more than once per year',
  often: 'Often (every couple of months)'
});

const collectorSchema = new Schema ({
user: {
  type: Schema.Types.ObjectId,
  ref: 'User'
},
firstName: String,
lastName: String,
email: String,
birthdate: String,
address: String,
behaviour : {
  type: String,
  enum : Object.values(behaviours)
},
budget: Number,
Newsletter: Boolean
});

Object.assign(collectorSchema.statics, { behaviours });

const Collector = model("Collector", collectorSchema);
module.exports = Collector;