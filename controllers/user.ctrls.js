const User = require("../models/User");
const bcrypt = require('bcrypt')
const session = require('express-session');
const { default: mongoose } = require("mongoose");


//GET all Users
const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(500).json({message: "Unexpected Error Occured"})
    } else {
        return res.status(200).json({users})
    }
}

//POST register
const register = async (req, res) => {
    const {name, email, password} = req.body
    // if(
    //     !name && 
    //     name.trim()==="" && 
    //     !email && 
    //     email.trim()==="" && 
    //     !password && 
    //     password.length < 6
    //     ) {
    //         return res.status(422).json({message: "Invalid username, email, and/or password"})
    //     }
    
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    let user;
    try {
        user = new User({email, name, password: hashedPassword})
        await user.save()
    } catch (err) {
        return console.log(err)
    }

    if(!user) {
        return res.status(500).json({message: "Unexpected Error Occured"})
    } else {
        return res.status(200).json({user})
    }

}

//POST login
const login = async (req, res) => {
    // const {name, email, password} = req.body
    // if(
    //     !email && 
    //     email.trim()==="" && 
    //     !password && 
    //     password.length < 6
    //     ) {
    //         return res.status(422).json({message: "Invalid email, and/or password"})
    //     }
    let existingUser;
        try {
            existingUser = await User.findOne({email})
        } catch (err) {
            return console.log(err)
        }
        if(!existingUser) {
            return res.status(404).json({message: "No User Found"})
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Password is Incorrect"})
        } else {
            res.status(200).json({id: existingUser, message: "Login Successful!"})
        }
        //start session
        const session = await mongoose.startSession()
        session.startTransaction()
}

// DESTROY logout
const logout = async (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({
            message: "User Logged-out Successfully"
        })
    })
}

module.exports = {
    getAllUsers,
    register,
    login,
    logout
}

