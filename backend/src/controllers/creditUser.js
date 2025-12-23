import CreditUser from "../models/CreditUser.js";
import mongoose from "mongoose";

// Get all users
export const getAllCreditUsers = async (req, res) => {
    try {
        const creditUsers = await CreditUser.find();
        res.status(200).json({
            success: true,
            data : creditUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}

// Get user by ID
export const getCreditUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Credit user not found" });
        }
        const creditUser = await CreditUser.findById(id);
        if(!creditUser) {
            return res.status(404).json({ message: "Credit user not found" });
        }
        res.status(200).json({
            success: true,
            data : creditUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Create user
export const createCreditUser = async (req,res) => {
    try{
        const creditUser = new CreditUser(req.body);
        const newCreditUser = await creditUser.save();
        res.status(201).json({
            success: true,
            data : newCreditUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update user
export const updateCreditUser = async (req,res) =>{
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Credit user not found" 
            });
        }
        const creditUser = await CreditUser.findByIdAndUpdate(
        id,
        req.body, {
            new : true,
            runValidators : true
        });
        if(!creditUser) {
            return res.status(404).json({
                success: false,
                message: "Credit user not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : creditUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete user
export const deleteCreditUser = async (req,res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Credit user not found" 
            });
        }
        const creditUser = await CreditUser.findByIdAndDelete(id);
        if(!creditUser) {
            return res.status(404).json({
                success: false,
                message: "Credit user not found" 
            });
        }
        res.status(200).json({
            success: true,
            data : creditUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
