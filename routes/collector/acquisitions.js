const router = require('express').Router();
const Gallery = require('../../models/Gallery');
const Artist = require('../../models/Artist.model.js');
const Message = require('../../models/Message');
const Request = require('../../models/Request');
const Collector = require('../../models/Collector');

const { uploader } = require('../../config/cloudinary');
const passport = require('passport');

// middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({message: "Unauthorized"});
  }
}

router.get("/galleries", isAuthenticated, async (req, res, next) => {
  try {
    const galleries = await Gallery.find();
    // take only gallery's name and id, not all info to protect galley confidentials
    const data = await galleries.map(gallery => ({id: gallery._id, name: gallery.name}));
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.get("/acquisitions", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  let collector;
  try {
    collector = await Collector.findOne({user: userId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!collector) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }
  try {
    // avoid expose all gallery and artist info
    const acquisitions = await Request.find({collector: collector._id})
      .populate("gallery", {name: 1})
      .populate("collector", {firstName: 1, lastName: 1})
      .populate("preferredArtist", {name: 1})
      .populate("messages", {message: 1, sender: 1, createdAt: 1})
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
    console.log(acquisitions);
    res.status(200).json(acquisitions);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});


router.post("/request",  isAuthenticated,  async (req, res, next) => {
  const userId =  req.session.passport.user;
  // console.log(userId)
  let collector;
  try {
    collector = await Collector.findOne({user: userId});
    console.log(collector);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!collector) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }
  const data = req.body;
  let preferredArtist;
  if (data.artist && !data.suggestion) {
    let regex = new RegExp(data.artist, 'i');
    // can search for multipe artists later
    // matchedArtists = await Artist.find({gallery: data.gallery, name: {$regex: regex}});
    // matchedArtists = matchedArtists.map(artist => artist._id);
    const matchedArtist = await Artist.findOne({gallery: data.gallery, name: {$regex: regex}});
    if (preferredArtist) {
      preferredArtist = matchedArtist._id;
    }
  }
  const message = data.requestMessage;
  // if the matchedArtists empty, just offer artwork from any artists in the gallery
  try {
    const createdMessage = await Message.create({collector: collector._id, gallery: data.gallery, message: message, sender: "Collector"});
    const createdRequest = await Request.create({
      ...data, collector: collector._id, preferredArtist: preferredArtist, messages: [createdMessage._id]
    });
    console.log(createdRequest);
    if (createdRequest) {
      return res.status(200).json({success: true});
    }
    return res.status(500).json({success: false });
  } catch (error) {
    res.status(500).json({ message: 'Error while attempting to access database', success: false });
  }
});

router.post("/decision", isAuthenticated,  async (req, res, next) => {
  const userId =  req.session.passport.user;
  let collector;
  try {
    collector = await Collector.findOne({user: userId});
    console.log(collector);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!collector) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }

  const {decision, requestId} = req.body;
  try {
    if (decision === "accept") {
      const updatedRequest = await Request.findOneAndUpdate({_id: requestId, collector: collector._id }, {offerStatus: "Accepted"}, {new: true});
      if (updatedRequest) return res.status(200).json({success: true, decision: "accept"});
    }
    if (decision === "cancel") {
      const updatedRequest = await Request.findOneAndUpdate({_id: requestId, collector: collector._id }, {offerStatus: "Cancelled", status: "Confirmed"}, {new: true});
      if (updatedRequest) return res.status(200).json({success: true, decision: "cancel"});
    }
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.post("/message", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  let collector;
  try {
    collector = await Collector.findOne({user: userId});
    console.log(collector);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!collector) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }

  const {message, requestId, galleryId} = req.body;

  try {
    const createdMessage = await Message.create({collector: collector._id, gallery: galleryId, message: message, sender: "Collector"});
    if (createdMessage) {
      const updatedRequest = await Request.findOneAndUpdate({_id: requestId, collector: collector._id }, { $push: {messages: createdMessage._id}}, {new: true});
      if (updatedRequest) {
        return res.status(200).json(createdMessage);
      }
    }
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }

});

module.exports = router;