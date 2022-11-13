const Posts = require('../models/Posts')

//GET all posts
const index = async (req, res) => {
    let posts;
    try {
        posts = await Posts.find()
    } catch (err) {
        return console.log(err)
    }

    if(!posts) {
        return res.status(500).json({message:"Unexpected Error Occurred"})
    } else {
        return res.status(200).json({posts})
    }
}

//POST create new post
const create = async (req, res) => {
    const {title, location, description, images, date, favorite, user} = req.body
    
    if(
        !title &&
        title.trim() === "" &&
        !location &&
        location.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !images &&
        images.trim() === "" &&
        !date &&
        !favorite &&
        !user
        ) {
            return res.status(422).json({message: "Invalid data"})
        } else {
            let post;
            try {
                post = new Posts({title, location, 
                description,
                images, 
                date: new Date(`${date}`), favorite, 
                user})
                post = await post.save()
            } catch(err) {
                return console.log(err)
            }
            if (!post) {
                return res.status(500).json({message: "Unexpected error occurred"})
            } else {
                return res.status(201).json({post})
            }
        }
}








module.exports = {
    index,
    create,
}