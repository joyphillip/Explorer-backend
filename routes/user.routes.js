const express = require('express')
const userRouter = express.Router()
const ctrls = require('../controllers/user.ctrls')

userRouter.get('/', ctrls.getAllUsers)
userRouter.post('/register', ctrls.register)
userRouter.post('/login', ctrls.login)



module.exports = userRouter


