import User from "../models/User.js";
import { parseId } from "../utils/parseId.js";

// Get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
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
        const id = parseId(req.params.id);
        if(!id) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const user = await User.getById(id);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
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
        const { name, email, password, role } = req.body;
        const existingUser = await User.findByEmail(email);
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
        const newUser = await User.create({ name, email, password, role });
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
        const id = parseId(req.params.id);
        if(!id) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }

        if (req.body.email) {
            const existingUser = await User.findByEmail(req.body.email);
            if(existingUser && existingUser._id !== id) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists" 
                });
            }
        }

        const user = await User.update(id, req.body);
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
        const id = parseId(req.params.id);
        if(!id) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }
        const user = await User.deleteById(id);
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
