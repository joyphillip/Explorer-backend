const express = require('express')
const postsRouter = express.Router()

const ctrls = require('../controllers')

postsRouter.get('/', ctrls.posts.index)
postsRouter.post('/', ctrls.posts.create)

module.exports = postsRouter