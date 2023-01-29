const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const handleFile = require("../middleware/handle-file");

const PostsController = require('../controllers/posts');

router.post('', checkAuth, handleFile, PostsController.createPost);
router.put('/:id', checkAuth, handleFile, PostsController.updatePost);
router.get('', PostsController.fetchPosts);
router.get('/:id', PostsController.fetchPost);
router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;
