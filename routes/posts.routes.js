const express = require('express')
const postsRouter = express.Router()

const ctrls = require('../controllers')

postsRouter.get('/', ctrls.posts.getAllPosts)
postsRouter.get('/:id', ctrls.posts.showPost)
postsRouter.post('/', ctrls.posts.createPost)
postsRouter.put('/:id', ctrls.posts.updatePost)
postsRouter.delete('/:id', ctrls.posts.deletePost)
postsRouter.get('/user/:id', ctrls.posts.getByUserId)


module.exports = postsRouter