const router = require('express').Router();
const Gallery = require('../../models/Gallery');
const { uploader, cloudinary } = require('../../config/cloudinary');


router.get("/", (req, res, next) => {
  res.json("GET '/': All good in here");
});


router.post("/new", uploader.single('image'), async (req, res, next) => { // loginCheck() middleware
  // const user =  req.session.user;
  const { name, address, biography, position, website, convelio } = req.body; //user: user._id, 
  // validation later
  const imageUrl = req.file.path;
  const imgPublicId = req.file.filename;
  // console.log(imageUrl);
  try {
    const gallery = await Gallery.create({name, address, biography, position, imageUrl, imgPublicId, website, convelio});
    res.json({gallery, success: true });
  } catch (err) {
    console.log(err);
    res.json({message: "Something is wrong with the backend", success: false});
  }
});


module.exports = router;