/* == External Modules == */
const express = require('express')

/* == Internal Modules == */

/* == Express Instance == */
const app = express()

/* == Port == */
const PORT = process.env.PORT || 3000;

/* == DB connection == */

/* == Middleware == */

/* == Routes == */

app.listen(PORT, () => {
  console.log('✨', 'Listening on Port:', PORT, '✨',)
})
