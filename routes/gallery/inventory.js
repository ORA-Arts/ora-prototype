const router = require('express').Router();
const Artwork = require('../../models/Artwork');
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

router.get('/', isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    // add gallery id into find later
    const existedArtworks = await Artwork.find({user: userId});
    res.status(200).json(existedArtworks);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

// single image first
router.post('/new', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  console.log("herhe")
  const userId =  req.session.passport.user;
  // later for gallery_id by as a param or in the request body

  // latter for multiple image
  if (!req.file) return res.status(500).json({message: "Invalid uploaded images", success: false });
  const imageUrl = req.file.path;
  const imgPublicId = req.file.filename;
  const data = req.body;
  data.images = [{imageUrl, imgPublicId}];
  console.log(data);
  try {
    const artwork = await Artwork.create({...data, user: userId});
    res.status(200).json(artwork);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});

router.get('/:id', isAuthenticated, async (req, res, next) => {
  const artworkId = req.params.id;
  const userId =  req.session.passport.user;
  try {
    const artwork = await Artwork.findOne({user: userId, _id: artworkId});
    res.status(200).json(artwork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

module.exports = router;