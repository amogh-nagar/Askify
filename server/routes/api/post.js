const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

const Profile = require('../../models/Profile');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    get api/posts
// @desc     GET all posts
// @access   Private
// Profiles are public but posts are not
router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ data: -1 }); /*Most recent first */
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    get api/posts
// @desc     GET a post by ID
// @access   Private
// Profiles are public but posts are not
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); /*Most recent first */

    if (!post) {
      return res.status(404).json({ msg: 'POST not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No USER and no POST not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/post/:ID
// @desc     GET a post by ID
// @access   Private
// Profiles are public but posts are not
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); /*Most recent first */

    // Check user
    if (post.user.toString() !== req.user.id) {
      /*If the user that ows it is not deleteing it , inspite of that other user is deleting it */ /*req.user.id is a type of string and post.user.id is type of id so we have to convert it into String */
      return res.status(401).json({ msg: 'User not authorized to do this' });
    }

    if (!post) {
      return res.status(404).json({ msg: 'POST not found' });
    }

    await post.remove();

    res.json({
      msg: 'Post removed',
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No USER and no POST not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    PUT api/post/like/:ID
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    ); /*since id includes url, so we use params */

    // Check if user has already liked th epost
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      /*If array length is grater thanzero and if user's like matches with req.user.id then the user has
  alrerady liked it */
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
}); /*It will give us post's id and id of user that liked it */

// @route    PUT api/post/unlike/:ID
// @desc     unLike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    ); /*since id includes url, so we use params */

    // Check if user has already liked th epost
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      /*If array length is grater thanzero and if user's like matches with req.user.id then the user has
  alrerady liked it */
      return res.status(400).json({ msg: 'Post has not yet liked' });
    }
    // Get the remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    // Taking the index of user's like  and remove that like one time

    await post.save();
    res.send('Post unliked successfully');
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
}); /*It will give us post's id and id of user that liked it */

// @route    POST api/post/cpmment/:id (id of post to cmmnt on)
// @desc     Comment on post
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
  const  errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = ({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment from posts
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // If id of comment matches with the id provided by us then it will excute

    // Make sure comment exits
    if (!comment) {
      return res
        .status(404)
        .json({ msg: 'Comment does not exists' }); /*404 NOT FOUND */
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' }); /*404 NOT FOUND */
    }

    // Get the remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(
      post.comments
    ); /*It will give the remaing comments left in that posts */
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
