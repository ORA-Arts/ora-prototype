
const router = require('express').Router();
const Request = require('../../models/Request');
const Gallery = require('../../models/Gallery');

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
  let gallery;
  try {
    gallery = await Gallery.findOne({user: userId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error while attempting to access database' });
  }
  if (!gallery) {
    console.log("Unauthorized")
    return res.status(403).json({message: "Unauthorized"});
  }
  if (gallery) {
    try {
      const requests = await Request.find({gallery: gallery._id}).populate("collector").populate("preferredArtist").populate("messages");
      const data = requests.map(request => {
        const name = `${request.collector.firstName} ${request.collector.lastName}`;
        const requestCopy = {...request.toJSON()};
        requestCopy.collector = {name, id: request.collector._id};
        console.log(requestCopy);
        return requestCopy;
      });
      // console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error while attempting to access database' });
    }
    
  } else {
    res.status(500).json({success: false});
  }
});


module.exports = router;