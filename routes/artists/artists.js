const router = require('express').Router();
const Artist = require('../../models/Artist.model.js');
const { artistUploader } = require('../../config/cloudinary');
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
    const existingArtists = await Artist.find();
    res.status(200).json(existingArtists);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.get('/:id', isAuthenticated, async (req, res, next) => {
  const artistId = req.params.id;
  const userId =  req.session.passport.user;
  try {
    const artist = await Artist.findOne({galleryId: userId, _id: artistId});
    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.post('/', isAuthenticated, artistUploader.single('image'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  const data = req.body;
  if (req.file) {
  const imageUrl = req.file.path;
  const imgPublicId = req.file.filename;
  data.imageUrl = imageUrl;
  data.imgPublicId = imgPublicId;
  }
  
  try {
    const artist = await Artist.create({...data, galleryId: userId});
    res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});

router.put("/", isAuthenticated, artistUploader.single('image'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  // const data = {...req.body.data};
  const data = {...req.body};
  if (req.file) {
    const imageUrl = req.file.path;
    const imgPublicId = req.file.filename;
    data.imageUrl = imageUrl;
    data.imgPublicId = imgPublicId;
  }

  try {
    const updatedGallery = await Gallery.findOneAndUpdate({user: userId}, {...data}, {new: true});
    res.status(200).json(updatedGallery);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Something is wrong with the backend", success: false});
  }
});


module.exports = router;