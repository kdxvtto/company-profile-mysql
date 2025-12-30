import Publications from "../models/Publications.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import mongoose from "mongoose";

// Get all publications
export const getAllPublications = async (req, res) => {
    try {
        const publications = await Publications.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: publications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get publication by ID
export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }
        const publication = await Publications.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }
        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create publication
export const createPublication = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const file = req.file ? req.file.path : null;
    try {
        const { name, category } = req.body;

        if (!name || !file) {
            return res.status(400).json({
                success: false,
                message: "Name and file are required"
            });
        }

        const publication = new Publications({
            name,
            category: category || "Laporan",
            file: [file] // file is array in model
        });
        await publication.save();

        res.status(201).json({
            success: true,
            data: publication
        });
    } catch (error) {
        // Delete uploaded file from Cloudinary on error
        if (file) {
            const publicId = getPublicIdFromUrl(file);
            await deleteFromCloudinary(publicId);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update publication
export const updatePublication = async (req, res) => {
    const newFile = req.file ? req.file.path : null;
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            if (newFile) {
                const publicId = getPublicIdFromUrl(newFile);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const publication = await Publications.findById(id);
        if (!publication) {
            if (newFile) {
                const publicId = getPublicIdFromUrl(newFile);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const oldFiles = publication.file;
        
        // Update fields
        if (req.body.name) publication.name = req.body.name;
        if (req.body.category) publication.category = req.body.category;
        if (newFile) publication.file = [newFile];

        await publication.save();

        // Delete old files from Cloudinary after successful update
        if (newFile && oldFiles && oldFiles.length > 0) {
            for (const f of oldFiles) {
                const publicId = getPublicIdFromUrl(f);
                await deleteFromCloudinary(publicId);
            }
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        // Delete new file on error
        if (newFile) {
            const publicId = getPublicIdFromUrl(newFile);
            await deleteFromCloudinary(publicId);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete publication
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const publication = await Publications.findByIdAndDelete(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        // Delete files from Cloudinary
        if (publication.file && publication.file.length > 0) {
            for (const f of publication.file) {
                const publicId = getPublicIdFromUrl(f);
                await deleteFromCloudinary(publicId);
            }
        }

        res.status(200).json({
            success: true,
            message: "Publication deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
