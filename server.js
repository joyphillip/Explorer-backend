/* == External Modules == */
const express = require('express')

/* == Internal Modules == */
const routes = require('./routes');
const postsRouter = require('./routes/posts.routes');
const userRouter = require('./routes/user.routes');

/* == Express Instance == */
const app = express()

/* == cors == */
const cors = require('cors');
app.use(cors());
// whitelist & corsOptions
const whitelist = [`${process.env.FRONTEND_URL}`, 'https://git.heroku.com/explorer-frontend-22.git']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
/* == config == */
require('dotenv').config()

/* == Port == */
const PORT = process.env.PORT || 3000;

/* == DB connection == */
require('./config/db.connection')

/* == Middleware == */
app.use(cors('*'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* == Routes == */
app.use('/posts', postsRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log('✨', 'Listening on Port:', PORT, '✨',)
})
