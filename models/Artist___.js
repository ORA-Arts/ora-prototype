const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: String,
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;