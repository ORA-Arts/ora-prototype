// const router = require('express').Router();
// const CollectorProfile = require('../../models/CollectorProfile');
// const { uploader } = require('../../config/cloudinary');
// const passport = require('passport')

// // middleware
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).json({message: "Unauthorized"});
//   }
// }

// router.get("/", isAuthenticated, async (req, res, next) => {
//   const userId =  req.session.passport.user;
//   try {
//     const existedProfile = await Gallery.findOne({user: userId});
//     res.status(200).json(existedGallery);
//   } catch(err) {
//     res.status(500).json({ message: 'Error while attempting to access database' });
//   }
// });