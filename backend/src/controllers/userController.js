import User from "../models/User.js";
import mongoose from "mongoose";

// Get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            data : users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Get user by ID

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            data : user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// create user

export const createUser = async (req,res) =>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
        if(existingUser) {
            return res.status(400).json({
                success: false, 
                message: "User already exists" 
            });
        }
        const user = new User({ name, email, password });
        const newUser = await user.save();
        res.status(201).json({
            success: true,
            data : newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}

// update user

// Wrong before: cek email duplikat dilakukan setelah update tanpa mengecualikan diri sendiri, bisa menolak update valid.
export const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }

        const existingUser = await User.findOne({ email : req.body.email, _id : { $ne : id } });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists" 
            });
        }

        const user = await User.findByIdAndUpdate(
        id,
        req.body, {
            new : true,
            runValidators : true
        }).select("-password");
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : user
        });
        }
    catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// delete user

export const deleteUser = async (req,res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
