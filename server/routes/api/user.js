const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); /*for Secret */
const {
  check,
  validationResult,
} = require('express-validator'); /*To check whether user is sending relevalant information */

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 3 or more characters'
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // If user already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }/*400-> BAD INPUT */
      // If user not exists then we have to set avatar of his/her
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      }); /*Just a instance */

      const salt = await bcrypt.genSalt(
        10
      ); /*salt is use for hashing, 10-> the more the valuye the more secure password */

      user.password = await bcrypt.hash(password, salt);
      /*Whenever a function return promise we have to put await infront of it */
      await user.save();

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
