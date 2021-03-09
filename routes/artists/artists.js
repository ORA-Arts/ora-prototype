const router = require('express').Router();
const Artist = require('../../models/Artist.model.js');
const { artistUploader, uploader } = require('../../config/cloudinary');
const passport = require('passport')

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
  try {
    // const existingArtists = await Artist.findOne({user: userId}); TODO: change it to fetch gallery specific artists
    const existingArtists = await Artist.find({user: userId});
    res.status(200).json(existingArtists);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.get('/:id', isAuthenticated, async (req, res, next) => {
  const artistId = req.params.id;
  const userId =  req.session.passport.user;
  try {
    const artist = await Artist.findOne({_id: artistId, user: userId});
    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.post('/', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  const data = req.body;
  if (req.file) {
    const imageUrl = req.file.path;
    const imgPublicId = req.file.filename;
    data.imageUrl = imageUrl;
    data.imgPublicId = imgPublicId;
  }
  data.medium = data.medium.split(",").filter(el => el);
  console.log(data)
  try {
    const artist = await Artist.create({...data, user: userId});
    res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});


// artistUploader does not work probally
router.put("/:id", isAuthenticated, artistUploader.single('image'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  const artistId = req.params.id;
  const data = req.body;
  if (req.file) {
    const imageUrl = req.file.path;
    const imgPublicId = req.file.filename;
    data.imageUrl = imageUrl;
    data.imgPublicId = imgPublicId;
  }

  try {
    const updatedGallery = await Artist.findOneAndUpdate({user: userId, _id: artistId}, {...data}, {new: true});
    res.status(200).json(updatedGallery);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Something is wrong with the backend", success: false});
  }
});


module.exports = router;