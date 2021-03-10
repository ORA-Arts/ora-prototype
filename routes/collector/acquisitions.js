const router = require('express').Router();
const Gallery = require('../../models/Gallery');
const Artist = require('../../models/Artist.model.js');
const Message = require('../../models/Message');
const Request = require('../../models/Request');
const { uploader } = require('../../config/cloudinary');
const passport = require('passport');

// middleware
function isAuthenticated(req, res, next) {
  console.log(req)
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
  const collector =  req.session.passport.user;
  try {
    // avoid expose all gallery and artist info
    const acquisitions = await Request.find({collector: collector}).populate("gallery").populate("preferredArtist");
    const data = acquisitions.map(acquisition => {
      if (acquisition.preferredArtist) {
        acquisition.preferredArtist = acquisition.preferredArtist.name;
      }
      acquisition.gallery = acquisition.gallery.name;
      return acquisition;
    });
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});


router.post("/request",  isAuthenticated,  async (req, res, next) => {
  const collector =  req.session.passport.user;
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
    const createdMessage = await Message.create({collector: collector, gallery: data.gallery, message: message});
    const createdRequest = await Request.create({
      ...data, collector: collector, preferredArtist: preferredArtist, messages: [createdMessage._id]
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


module.exports = router;