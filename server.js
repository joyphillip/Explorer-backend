/* == External Modules == */
const express = require('express')

/* == Internal Modules == */
const routes = require('./routes')

/* == Express Instance == */
const app = express()

/* == config == */
require('dotenv').config()

/* == Port == */
const PORT = process.env.PORT || 3000;

/* == DB connection == */
require('./config/db.connection')

/* == Middleware == */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* == Routes == */
app.use('/posts', routes.posts)

app.listen(PORT, () => {
  console.log('✨', 'Listening on Port:', PORT, '✨',)
})
