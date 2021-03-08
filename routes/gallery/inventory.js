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

// helper for medium filter
function mediumFilter(list, regex) {
  for (let el of list) {
    if (el.match(regex)) return true;
  }
  return false;
}

router.get('/', isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    // add gallery id into find later
    const existedArtworks = await Artwork.find({user: userId}).populate("artist");
    res.status(200).json(existedArtworks);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

// Not need, better to perform in the frontend since all artworks are loaded at the first rendering
router.post('/', isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  // add gallery id into find later
  const query = req.body.query;
  const sortByPrice = req.body.sortByPrice;
  console.log(sortByPrice);
  
  let galleryArtworks = await Artwork.find({user: userId}).populate('artist');

  if (query) {
    let regex = new RegExp(query, 'i');
    galleryArtworks = galleryArtworks.filter(artwork => {
      return artwork.title.match(regex) || mediumFilter(artwork.medium, regex) || artwork.artist.name.match(regex);
    });
  }
  if (sortByPrice === "true") {
    galleryArtworks.sort((a, b) => a.price - b.price);
  }
  
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

router.post('/test', isAuthenticated, uploader.array('images[]'), async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  res.json({message: "empty"});
});

// single image first
router.post('/new', isAuthenticated, uploader.array('images[]'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  // later for gallery_id by as a param or in the request body
  // add artist Id when Patrick done!

  // latter for multiple image
  if (!req.files) return res.status(500).json({message: "Invalid uploaded images", success: false });
  const images = req.files.map(image => ({imageUrl: image.path, imgPublicId: image.filename}));
  const data = req.body;
  data.images = images;
  console.log(data);


  // delete later, this is just a fake artist - add the real artist
  // const fakeArtist = await Artist.create({name: "Konad Mayer"});
  try {
    const artwork = await Artwork.create({...data, user: userId, artist: mongoose.Types.ObjectId("60438b4f73af866d50b8bbde")});
    res.status(200).json(artwork);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});

// for editing
// if (!req.files) return res.status(500).json({message: "Invalid uploaded images", success: false });
// req.files.forEach(image => {
//   data.images.push({imageUrl: image.path, imgPublicId: image.filename});
// });

router.get('/:id', isAuthenticated, async (req, res, next) => {
  const artworkId = req.params.id;
  const userId =  req.session.passport.user;
  try {
    const artwork = await Artwork.findOne({user: userId, _id: artworkId}).populate('artist');
    res.status(200).json(artwork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.put('/:id', isAuthenticated, uploader.array('images[]'), async (req, res, next) => {
  const artworkId = req.params.id;
  const userId =  req.session.passport.user;

  // assume there is only one image
  // implement deleting images in the cloudanary later
  const data = req.body;
  delete data.images;
  delete data.artist;
  let uploadedImages = [];
  if (req.files) {
    uploadedImages = req.files.map(file => ({imageUrl: file.path, imgPublicId: file.filename}));
    console.log(uploadedImages);
  }

  try {
    const updatedArtwork = await Artwork.findOneAndUpdate(
      {user: userId, _id: artworkId}, {...data, $push: {images: {$each: uploadedImages}}}, {new: true});
    res.status(200).json(updatedArtwork);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Something is wrong with the backend", success: false});
  }
});

module.exports = router;