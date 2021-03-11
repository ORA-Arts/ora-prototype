const router = require('express').Router();
const Gallery = require('../../models/Gallery');
const Artist = require('../../models/Artist.model.js');
const Message = require('../../models/Message');
const Request = require('../../models/Request');
const Collector = require('../../models/Collector');

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


router.get("/", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    const existedCollector = await Collector.findOne({user: userId});
    res.status(200).json(existedCollector);
  } catch (error) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

router.post('/', isAuthenticated, async(req,res,next) => {
  const userId =  req.session.passport.user;
  const data = req.body;

  try {
    const existedCollector = await Collector.findOne({user: userId});
    console.log(existedCollector)
    if (existedCollector) return res.status(500).json({message: "Please don't change the http method"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'One User Profile for one user only' });
  }

  

  try {
    const collector = await Collector.create({...data, user: userId})
    res.status(200).json(collector);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error while attempting to access database", success: false});
  }
});



router.put('/', isAuthenticated, async(req, res, next) => {
  const userId =  req.session.passport.user;
  const data = req.body;
  // console.log(data)
try {
  const updatedCollector = await Collector.findOneAndUpdate({user: userId},{...data}, {new:true});
  res.status(200).json(updatedCollector);
} catch(err) {
  console.log(err);
  res.status(500).json({message:"Something is wrong with the backend", success: false});
}
});

router.get("/name", isAuthenticated, async (req, res, next) => {
  const userId =  req.session.passport.user;
  try {
    const existedCollector = await Collector.findOne({user: userId});
    res.status(200).json(existedCollector.firstName);
  } catch (error) {
    res.status(500).json({ message: 'Error while attempting to access database' });
  }
});

module.exports = router;