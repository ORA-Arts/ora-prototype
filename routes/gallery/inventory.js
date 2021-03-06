const router = require('express').Router();
const Artwork = require('../../models/Artwork');
const Artist = require('../../models/Artist');
const { uploader } = require('../../config/cloudinary');
const passport = require('passport');
const mongoose = require("mongoose");

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

router.post('/', isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  // add gallery id into find later
  const query = req.body.query;
  console.log(query);
  let regex = new RegExp(query, 'i');
  let galleryArtworks = await Artwork.find({user: userId}).populate('artist');
  galleryArtworks = galleryArtworks.filter(artwork => {
    return artwork.title.match(regex) || artwork.medium.match(regex) || artwork.artist.name.match(regex);
  });
  // galleryArtworks = galleryArtworks.filter(ar)
  // const result = await Artwork.aggregate([
  //   { $match: {user: mongoose.Types.ObjectId(userId)}},
  //   { $lookup: {
  //     from: ''
  //   }}
  // ]);
  // console.log(galleryArtworks);

  res.json(galleryArtworks);

});

// single image first
router.post('/new', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  console.log("herhe")
  const userId =  req.session.passport.user;
  // later for gallery_id by as a param or in the request body
  // add artist Id when Patrick done!

  // latter for multiple image
  if (!req.file) return res.status(500).json({message: "Invalid uploaded images", success: false });
  const imageUrl = req.file.path;
  const imgPublicId = req.file.filename;
  const data = req.body;
  data.images = [{imageUrl, imgPublicId}];
  console.log(data);
  // delete later, this is just a fake artist
  // const fakeArtist = await Artist.create({name: "Konad Mayer"});
  
  try {
    const artwork = await Artwork.create({...data, user: userId, artist: mongoose.Types.ObjectId("60438b4f73af866d50b8bbde")});
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

router.put('/:id', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  const artworkId = req.params.id;
  const userId =  req.session.passport.user;

  // assume there is only one image
  // implement deleting images in the cloudanary later
  const data = req.body;
  if (req.file) {
    const imageUrl = req.file.path;
    const imgPublicId = req.file.filename;
    data.images = [{imageUrl, imgPublicId}];
  }
  // for test
  else {
    data.images = [{imageUrl: data.imageUrl, imgPublicId: data.imgPublicId}];
  }

  try {
    const updatedArtwork = await Artwork.findOneAndUpdate({user: userId, _id: artworkId}, {...data}, {new: true});
    res.status(200).json(updatedArtwork);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Something is wrong with the backend", success: false});
  }
});

module.exports = router;