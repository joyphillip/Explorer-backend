// require mongoose
const mongoose = require('mongoose');

// set up connection with the DB
mongoose.connect(
    `mongodb+srv://jphillip018:${process.env.MONGODB_PASSWORD}@joyscluster.fmwflap.mongodb.net/Explorer?retryWrites=true&w=majority`
);

// set up listeners to monitor your database connection
mongoose.connection.on('connected', ()=> console.log('DB connected... 🙌🙌🙌'));

mongoose.connection.on('error', (err)=> console.log(err.message));

mongoose.connection.on('disconnected', ()=> console.log('mongoose disconnected'));
