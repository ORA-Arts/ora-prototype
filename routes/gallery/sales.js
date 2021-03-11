
const router = require('express').Router();
const Request = require('../../models/Request');
const Gallery = require('../../models/Gallery');
const Message = require('../../models/Message');
const Artist = require('../../models/Artist.model.js');

// middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({message: "Unauthorized"});
  }
}

router.get("/", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  let gallery;
  try {
    gallery = await Gallery.findOne({user: userId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!gallery) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }
  if (gallery) {
    try {
      const requests = await Request.find({gallery: gallery._id})
        .populate("gallery", {name: 1})
        .populate("collector", {firstName: 1, lastName: 1, _id: 1})
        .populate("preferredArtist", {name: 1})
        .populate("messages", {message: 1, sender: 1})
        // .populate("offeredArtwork", {artist: 1})
        .populate([
          {
            path: "offeredArtwork",
            model: "Artwork",
            populate: {
              path: "artist",
              model: "Artist",
              select: "name"
            }
          }
        ]);
      res.status(200).json(requests);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error while attempting to access database' });
    }
    
  } else {
    res.status(500).json({success: false});
  }
});


router.post("/offer", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  const {artwork, message, collector, request} = req.body;

  let gallery;
  try {
    gallery = await Gallery.findOne({user: userId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!gallery) {
    console.log("Unauthorized");
    return res.status(403).json({message: "Unauthorized"});
  }


  let createdMessage;
  try {
    createdMessage = await Message.create({collector, gallery: gallery._id, message, sender: "Gallery"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (createdMessage) {
    try {
      const data = await Request.findByIdAndUpdate(request, {$push: {messages: createdMessage._id}, status: "In Progress", offeredArtwork: artwork, offerStatus: "Sent"}, {new: true})
        .populate("gallery", {name: 1})
        .populate("collector", {firstName: 1, lastName: 1, _id: 1})
        .populate("preferredArtist", {name: 1})
        .populate("messages", {message: 1, sender: 1})
        .populate([
          {
            path: "offeredArtwork",
            model: "Artwork",
            populate: {
              path: "artist",
              model: "Artist",
              select: "name"
            }
          }
        ]);
      return res.status(200).json({data, success: true});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false});
    }
  }
  res.status(500).json({success: false});
});

module.exports = router;