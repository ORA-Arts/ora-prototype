const router = require('express').Router();
const Gallery = require('../../models/Gallery');
const { uploader } = require('../../config/cloudinary');
const passport = require('passport')

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

module.exports = router;