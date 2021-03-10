
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
  if (gallery) {
    const requests = await Request.find({gallery: gallery._id}).populate("preferredArtist");
    const data = requests.map(request => {
      request.collector = {id: request.collector._id, name: request.collector.name};
      return request;
    });
    res.status(200).json(data);
  } else {
    res.status(500).json({success: false});
  }
});


module.exports = router;