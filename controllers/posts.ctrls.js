const { compare, compareSync } = require('bcrypt');
const Posts = require('../models/Posts')

//GET all posts
const  getAllPosts = async (req, res) => {
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
const createPost = async (req, res) => {
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

//GET post by id
const showPost = async (req, res) => {
    const id = req.params.id

    let post
    try {
        post = await Posts.findById(id)
    } catch (err) {
        return console.log(err)
    }
    if (!post) {
        return res.status(404).json({message: "No Post Found"})
    } else {
        return res.status(200).json({post})
    }
}

//PUT update post
const updatePost = async (req, res) => {
    const id = req.params.id;
    const {title, location, description, images, date, favorite} = req.body
    
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
        !favorite
    ) {
        return res.status(422).json({message: "Invalid data"}) 
        }
        let post;
        try {
            post = await Posts.findByIdAndUpdate(id, {
                title, 
                location, 
                description, 
                images, 
                date: new Date(`${date}`), 
                favorite
            })
        } catch (err){
            return console.log(err)
        }
        if (!post) {
            return res.stauts(500).json({message: "Unable to Update"})
        } else {
            return res.status(200).json({message: "Updated Successfully"})
        }
}

//DELETE post
const deletePost = async (req, res) => {
    const id = req.params.id;
    let post;
    try {
        post = await Posts.findByIdAndRemove(id)
    } catch(err) {
        return console.log(err)
    }
    if (!post) {
        return res.status(500).json({message: "Unable to Delete"})
    } else {
        return res.status(200).json({message: "Post Deleted Successfully!"})
    }
}


module.exports = {
    getAllPosts,
    createPost,
    showPost,
    updatePost,
    deletePost
}