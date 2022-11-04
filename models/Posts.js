const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
country: {
    type: String
},
description: {
    type: String
},
images: {
    type: [String]
},
date: {
    type: String
},
favorite: {
    type: Boolean,
    default: false
},
})

/* our schecma -> complied -> model -> is the one that have access to all the methods */
const Posts = mongoose.model( 'Posts',  postsSchema)

// export
module.exports = Posts