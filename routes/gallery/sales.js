
const router = require('express').Router();
const Request = require('../../models/Request');
const Gallery = require('../../models/Gallery');

// middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({message: "Unauthorized"});
  }
}

router.get("/", isAuthenticated, async (req, res, next) => {
  const galleryOwner =  req.session.passport.user;
  const gallery = await Gallery.findOne({user: galleryOwner});
  console.log(gallery);
  if (gallery) {
    const requests = await Request.find({gallery: gallery._id}).populate("gallery").populate("preferredArtist");
    res.status(200).json(requests);
  } else {
    res.status(500).json({success: false});
  }
});


module.exports = router;