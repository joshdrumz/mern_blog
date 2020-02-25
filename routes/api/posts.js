import { Router } from 'express';
import Post from '../../models/Post';

const router = Router();

/** 
 * @route   GET api/posts
 * @desc    Get All Posts
 * @access  Public
*/

router.get('/', async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) throw Error('No posts found');

    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/** 
 * @route   POST api/posts
 * @desc    Create a Post
 * @access  Private
*/

router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  });

  try {
    const post = await newPost.save();
    if (!post) throw Error('Something went wrong with saving this post');

    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/** 
 * @route   DELETE api/posts
 * @desc    Delete a Post
 * @access  Private
*/

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw Error('No post found');

    const removed = await post.remove();
    if (!removed) throw Error('Something went wrong while trying to delete this post');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;