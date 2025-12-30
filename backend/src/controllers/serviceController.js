import Services from "../models/Services.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import mongoose from "mongoose";

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        const service = await Services.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new service
export const createService = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const image = req.file ? req.file.path : null;
    try {
        const { title, content, category } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const service = new Services({ title, content, image, category });
        const newService = await service.save();
        res.status(201).json({
            success: true,
            data: newService
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

// Update service
export const updateService = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const newImage = req.file ? req.file.path : null;
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        const service = await Services.findById(id);
        if (!service) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        const oldImage = service.image;
        if (newImage) {
            service.image = newImage;
        }
        Object.assign(service, req.body);
        await service.save();

        // Delete old image from Cloudinary after successful update
        if (newImage && oldImage) {
            const publicId = getPublicIdFromUrl(oldImage);
            await deleteFromCloudinary(publicId);
        }

        res.status(200).json({
            success: true,
            data: service
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

// Delete service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        const service = await Services.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        
        // Delete image from Cloudinary
        if (service.image) {
            const publicId = getPublicIdFromUrl(service.image);
            await deleteFromCloudinary(publicId);
        }
        
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
