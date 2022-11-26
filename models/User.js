const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    //relating user to only their posts
    posts:[{
        type: mongoose.Types.ObjectId, 
        ref: "Posts",
        required: true
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User