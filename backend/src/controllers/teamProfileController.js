// Wrong before: nama import/instansiasi bentrok (const teamProfile = new teamProfile) dan kapitalisasi model.
import TeamProfile from "../models/teamProfile.js";
import { removeFile } from "../utils/file.js";
import mongoose from "mongoose";

// Get all team profiles
export const getAllTeamProfiles = async (req, res) => {
    try {
        const teamProfiles = await TeamProfile.find();
        res.status(200).json({
            success: true,
            data : teamProfiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

// Create team profile
export const createTeamProfile= async (req,res) => {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    try{
        const { name, position, facebook, instagram } = req.body;
        if(!name || !position || !image) {
            // Jika input kurang, bersihkan file yang terlanjur di-upload
            if(image) await removeFile(image);
            return res.status(400).json({ 
                success: false,
                message: "Name, position, and image are required" 
            });
        }
        const existingTeamProfile = await TeamProfile.findOne({name: { $regex: new RegExp(`^${name}$`, "i") }});
        if(existingTeamProfile) {
            if(image) await removeFile(image);
            return res.status(400).json({
                success: false,
                message: "Team profile already exists" 
            });
        }
        const teamProfile = new TeamProfile({ name, position, image, facebook, instagram });
        const newTeamProfile = await teamProfile.save();
        res.status(201).json({
            success: true,
            data : newTeamProfile
        });
    } catch (error) {
        if(image) await removeFile(image);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update team profile
export const updateTeamProfile = async (req,res) => {
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }
        const teamProfile = await TeamProfile.findById(id);
        if(!teamProfile) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }

        const oldImage = teamProfile.image;
        if(newImage) {
            teamProfile.image = newImage;
        }
        Object.assign(teamProfile, req.body);
        await teamProfile.save();

        // Hapus gambar lama hanya setelah update sukses
        if(newImage && oldImage) {
            await removeFile(oldImage);
        }

        res.status(200).json({
            success: true,
            data : teamProfile
        });
    } catch (error) {
        // Jika gagal, bersihkan file baru supaya tidak yatim
        if(newImage) await removeFile(newImage);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete team profile
export const deleteTeamProfile = async (req,res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }
        const teamProfile = await TeamProfile.findByIdAndDelete(id);
        if(!teamProfile) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found" 
            });
        }
        if(teamProfile.image) await removeFile(teamProfile.image);
        res.status(200).json({
            success: true,
            data : teamProfile
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
