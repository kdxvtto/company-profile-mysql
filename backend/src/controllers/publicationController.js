import Publications from "../models/Publications.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import { createActivityLog } from "./activityLogController.js";
import { parseId } from "../utils/parseId.js";

// Get all publications
export const getAllPublications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const publications = await Publications.getAll({ page, limit });
        const totalPublications = await Publications.count();
        const totalPages = Math.ceil(totalPublications / limit);
        res.status(200).json({
            success: true,
            data: publications,
            pagination: {
                totalPublications,
                totalPages,
                currentPage: page,
                limit
            }
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
        const id = parseId(req.params.id);
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }
        const publication = await Publications.getById(id);
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

        const publication = await Publications.create({
            name,
            category: category || "Laporan",
            file: [file] // file is array in model
        });

        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'create',
                resource: 'publication',
                resourceName: publication.name,
                resourceId: publication._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }

        res.status(201).json({
            success: true,
            data: publication
        });
    } catch (error) {
        // Delete uploaded file from Cloudinary on error
        if (file) {
            const publicId = getPublicIdFromUrl(file);
            await deleteFromCloudinary(publicId, 'raw');  // 'raw' for PDF files
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
        const id = parseId(req.params.id);

        if (!id) {
            if (newFile) {
                const publicId = getPublicIdFromUrl(newFile);
                await deleteFromCloudinary(publicId, 'raw');
            }
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const publication = await Publications.getById(id);
        if (!publication) {
            if (newFile) {
                const publicId = getPublicIdFromUrl(newFile);
                await deleteFromCloudinary(publicId, 'raw');
            }
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const oldFiles = publication.file;
        
        const updatedPublication = await Publications.update(id, {
            ...req.body,
            ...(newFile ? { file: [newFile] } : {})
        });

        // Delete old files from Cloudinary after successful update
        if (newFile && oldFiles && oldFiles.length > 0) {
            for (const f of oldFiles) {
                const publicId = getPublicIdFromUrl(f);
                await deleteFromCloudinary(publicId, 'raw');
            }
        }

        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'update',
                resource: 'publication',
                resourceName: updatedPublication.name,
                resourceId: updatedPublication._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPublication
        });
    } catch (error) {
        // Delete new file on error
        if (newFile) {
            const publicId = getPublicIdFromUrl(newFile);
            await deleteFromCloudinary(publicId, 'raw');
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
        const id = parseId(req.params.id);
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        const publication = await Publications.deleteById(id);
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
                await deleteFromCloudinary(publicId, 'raw');
            }
        }

        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'delete',
                resource: 'publication',
                resourceName: publication.name,
                resourceId: publication._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
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
