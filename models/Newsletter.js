const { Schema, model } = require("mongoose");


const newsletterSchema = new Schema({
    email: {
        type: String,
        max: 100
    }
})

const Newsletter = model("Newsletter", newsletterSchema);
module.exports = Newsletter;