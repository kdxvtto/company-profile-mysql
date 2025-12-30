import TeamProfile from "../models/TeamProfile.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import mongoose from "mongoose";

// Get all team profiles
export const getAllTeamProfiles = async (req, res) => {
    try {
        const teamProfiles = await TeamProfile.find();
        res.status(200).json({
            success: true,
            data: teamProfiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create team profile
export const createTeamProfile = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const image = req.file ? req.file.path : null;
    try {
        const { name, position, facebook, instagram } = req.body;
        if (!name || !position || !image) {
            return res.status(400).json({
                success: false,
                message: "Name, position, and image are required"
            });
        }
        const existingTeamProfile = await TeamProfile.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
        if (existingTeamProfile) {
            // Delete uploaded image from Cloudinary
            const publicId = getPublicIdFromUrl(image);
            await deleteFromCloudinary(publicId);
            return res.status(400).json({
                success: false,
                message: "Team profile already exists"
            });
        }
        const teamProfile = new TeamProfile({ name, position, image, facebook, instagram });
        const newTeamProfile = await teamProfile.save();
        res.status(201).json({
            success: true,
            data: newTeamProfile
        });
    } catch (error) {
        // Delete uploaded image from Cloudinary on error
        if (image) {
            const publicId = getPublicIdFromUrl(image);
            await deleteFromCloudinary(publicId);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update team profile
export const updateTeamProfile = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const newImage = req.file ? req.file.path : null;
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // Delete new image if ID invalid
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Team profile not found"
            });
        }
        const teamProfile = await TeamProfile.findById(id);
        if (!teamProfile) {
            // Delete new image if profile not found
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Team profile not found"
            });
        }

        const oldImage = teamProfile.image;
        if (newImage) {
            teamProfile.image = newImage;
        }
        Object.assign(teamProfile, req.body);
        await teamProfile.save();

        // Delete old image from Cloudinary after successful update
        if (newImage && oldImage) {
            const publicId = getPublicIdFromUrl(oldImage);
            await deleteFromCloudinary(publicId);
        }

        res.status(200).json({
            success: true,
            data: teamProfile
        });
    } catch (error) {
        // Delete new image on error
        if (newImage) {
            const publicId = getPublicIdFromUrl(newImage);
            await deleteFromCloudinary(publicId);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete team profile
export const deleteTeamProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found"
            });
        }
        const teamProfile = await TeamProfile.findByIdAndDelete(id);
        if (!teamProfile) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found"
            });
        }
        
        // Delete image from Cloudinary
        if (teamProfile.image) {
            const publicId = getPublicIdFromUrl(teamProfile.image);
            await deleteFromCloudinary(publicId);
        }
        
        res.status(200).json({
            success: true,
            data: teamProfile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
