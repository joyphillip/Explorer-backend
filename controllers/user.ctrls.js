const User = require("../models/User");

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

//POST signup
const register = async (req, res) => {
    const {name, email, password} = req.body
    if(
        !name && 
        name.trim()==="" && 
        !email && 
        email.trim()==="" && 
        !password && 
        password.length < 6
        ) {
            return res.status(422).json({message: "Invalid username, email, and/or password"})
        }

    let user;
    try {
        user = new User({email, name, password})
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


module.exports = {
    getAllUsers,
    register,
}

