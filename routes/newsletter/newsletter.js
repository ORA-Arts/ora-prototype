const router = require('express').Router();
const Newsletter = require('../../models/Newsletter');

//POST Layout Newsletter
router.post('/', (req,res,next) => {
  const { email } = req.body;
  
  Newsletter.findOne({
    email: email
  })
  .then(found => {
    if (found !== null) {
      return res.status(400).json({ message: 'EMAIL ALREADY EXISTS' });
    }
    // else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false) {
    //   return res.status(400).json({ message: 'PLEASE ENTER A VALID EMAIL' });
    //   }

    else {
      Newsletter.create({
        email: email
      })
      .then(email => {
        return res.status(200).json(email);
      })
    }
  })
})

module.exports = router;