import TeamProfile from "../models/TeamProfile.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import { createActivityLog } from "./activityLogController.js";
import { parseId } from "../utils/parseId.js";

// Get all team profiles
export const getAllTeamProfiles = async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page, 10) || 1;
        const limit = Number.parseInt(req.query.limit, 10) || 10;
        const safePage = Number.isFinite(page) ? Math.max(1, page) : 1;
        const safeLimit = Number.isFinite(limit)
            ? Math.min(100, Math.max(1, limit))
            : 10;

        const teamProfiles = await TeamProfile.getAll({ page: safePage, limit: safeLimit });
        const totalTeamProfiles = await TeamProfile.count();
        const totalPages = Math.ceil(totalTeamProfiles / safeLimit);
        res.status(200).json({
            success: true,
            data: teamProfiles,
            pagination: {
                totalTeamProfiles,
                totalPages,
                currentPage: safePage,
                limit: safeLimit
            }
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
        const existingTeamProfile = await TeamProfile.findByName(name);
        if (existingTeamProfile) {
            // Delete uploaded image from Cloudinary
            const publicId = getPublicIdFromUrl(image);
            await deleteFromCloudinary(publicId);
            return res.status(400).json({
                success: false,
                message: "Team profile already exists"
            });
        }
        const newTeamProfile = await TeamProfile.create({ name, position, image, facebook, instagram });
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'create',
                resource: 'team',
                resourceName: newTeamProfile.name,
                resourceId: newTeamProfile._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
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
        const id = parseId(req.params.id);
        if (!id) {
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
        const teamProfile = await TeamProfile.getById(id);
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
        const updatedTeamProfile = await TeamProfile.update(id, {
            ...req.body,
            ...(newImage ? { image: newImage } : {})
        });

        // Delete old image from Cloudinary after successful update
        if (newImage && oldImage) {
            const publicId = getPublicIdFromUrl(oldImage);
            await deleteFromCloudinary(publicId);
        }

        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'update',
                resource: 'team',
                resourceName: updatedTeamProfile.name,
                resourceId: updatedTeamProfile._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTeamProfile
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
        const id = parseId(req.params.id);
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Team profile not found"
            });
        }
        const teamProfile = await TeamProfile.deleteById(id);
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
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'delete',
                resource: 'team',
                resourceName: teamProfile.name,
                resourceId: teamProfile._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
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
