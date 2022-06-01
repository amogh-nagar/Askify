const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt=require('bcryptjs');
const config = require('config'); 
const {
    check,
    validationResult,
  } = require('express-validator');
  const jwt=require("jsonwebtoken")
// Just a test route

router.get('/', auth, async (req, res) => {
  try {
    const user = await  User.findById(req.user.id).select(
      '-password'
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('SErver error');
  }
});


router.post(
    '/',
    [
       check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Password is required'
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        // If user already exists
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
        }/*400-> BAD INPUT */
        // If user not exists then we have to set avatar of his/her
       
const isMatch=await bcrypt.compare(password,user.password);/*user.password is encrypted password */
if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Invalid credentials' }] });
  }

        //   Return jsonwebtoken
        const payload = {
          user: {
            id: user.id /**We are using mongoose so we don't require ._id */,
          },
        };/*Created a payload for token */
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),/*Taking jwtSecret from default.json */
          { expiresIn: 360000 },/*Time */
          (err, token) => {
            if (err) throw err;
  
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


module.exports = router;
