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

module.exports = {
    getAllUsers
}

