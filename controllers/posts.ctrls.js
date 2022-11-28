const { compare, compareSync } = require('bcrypt');
const { default: mongoose } = require('mongoose');
const session = require('express-session')
const Posts = require('../models/Posts');
const User = require('../models/User');

//GET all posts
const  getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Posts.find().populate('user')
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
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    let post;
        try {
            post = new Posts({
            title, 
            location, 
            description,
            images, 
            date, 
            favorite, 
            user
            })

            const session = await mongoose.startSession();

            session.startTransaction();
            existingUser.posts.push(post)
            await existingUser.save({session})
            post = await post.save({session})
            session.commitTransaction()
            } catch(err) {
                return console.log(err)
            }
            if (!post) {
                return res.status(500).json({message: "Unexpected error occurred"})
            } else {
                return res.status(201).json({post})
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
                date, 
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
        //create session
        const session = await mongoose.startSession()
        session.startTransaction()
        //find all the posts by user
        post = await Posts.findById(id).populate("user")
        post.user.posts.pull(post)
        await post.user.save({session})
        post = await Posts.findByIdAndRemove(id)
        session.commitTransaction()
    } catch(err) {
        return console.log(err)
    }
    if (!post) {
        return res.status(500).json({message: "Unable to Delete"})
    } else {
        return res.status(200).json({message: "Post Deleted Successfully!"})
    }
}

//GET posts by UserId
const getByUserId = async (req, res) => {
    const userId = req.params.id;
    let userPosts;
    try {
      userPosts = await User.findById(userId).populate("posts")
    } catch (err) {
      return console.log(err);
    }
    if (!userPosts) {
      return res.status(404).json({ message: "No Post Found" })
    }
    return res.status(200).json({ user: userPosts });
}


module.exports = {
    getAllPosts,
    createPost,
    showPost,
    updatePost,
    deletePost,
    getByUserId
}