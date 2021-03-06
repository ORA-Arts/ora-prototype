const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const userTypes = Object.freeze({
  Collector: 'collector',
  Gallery: 'gallery'
})


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  userType: {
    type: String,
    enum: Object.values(userTypes)
  }
});

Object.assign(userSchema.statics, { userTypes })

const User = model("User", userSchema);

module.exports = User;
