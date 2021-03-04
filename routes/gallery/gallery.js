const router = require('express').Router();
const Gallery = require('../../models/Gallery');


router.get("/", (req, res, next) => {
  res.json("GET '/': All good in here");
});

router.post("/new", async (req, res, next) => { // loginCheck() middleware
  // const user =  req.session.user;
  const { name, address, biography, position, image, website, convelio } = req.body; //user: user._id, 
  // validation later
  try {
    const gallery = await Gallery.create({name, address, biography, position, image, website, convelio});
    res.json({gallery, success: true });
  } catch (err) {
    console.log(err);
    res.json({message: "Something is wrong with the backend", success: false});
  }
});


module.exports = router;