const router = require('express').Router();


router.get("/login", (req, res, next) => { // "/" = "/api/auth"
  res.json("All good in here");
});

router.get("/signup", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;