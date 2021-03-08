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

router.get("/name", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    const existedGallery = await Gallery.findOne({user: userId});
    res.status(200).json(existedGallery.name);
  } catch (error) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.get("/", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    const existedGallery = await Gallery.findOne({user: userId});
    res.status(200).json(existedGallery);
  } catch(err) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.post('/', isAuthenticated, uploader.single('image'), async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    const existedGallery = await Gallery.findOne({user: userId});
    if (existedGallery) return res.status(500).json({message: "Please don't change the http method"});
  } catch (error) {
    return res.status(500).json({ message: 'One Gallery for one user only' });
  }

  const imageUrl = req.file.path;
  const imgPublicId = req.file.filename;
  const data = req.body;
  data.imageUrl = imageUrl;
  data.imgPublicId = imgPublicId;

  try {
    const gallery = await Gallery.create({...data, user: userId});
    res.status(200).json(gallery);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});

router.put("/", isAuthenticated, uploader.single('image'), async (req, res, next) => {
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