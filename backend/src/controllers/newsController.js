import News from "../models/News.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import { createActivityLog } from "./activityLogController.js";
import { parseId } from "../utils/parseId.js";

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const news = await News.getAll({ page, limit });
        const totalNews = await News.count();
        const totalPages = Math.ceil(totalNews / limit);
        res.status(200).json({
            success: true,
            data: news,
            pagination: {
                totalNews,
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

// Get news by ID
export const getNewsById = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.getById(id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create news
export const createNews = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const image = req.file ? req.file.path : null;
    try {
        const { title, content, date, category } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const newNews = await News.create({
            title,
            content,
            image: [image],
            date,
            category
        });
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'create',
                resource: 'news',
                resourceName: newNews.title,
                resourceId: newNews._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
        res.status(201).json({
            success: true,
            data: newNews
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

// Update news
export const updateNews = async (req, res) => {
    // Cloudinary returns full URL in req.file.path
    const newImage = req.file ? req.file.path : null;
    try {
        const id = parseId(req.params.id);
        if (!id) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.getById(id);
        if (!news) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        const oldImages = news.image;
        const updatedNews = await News.update(id, {
            ...req.body,
            ...(newImage ? { image: [newImage] } : {})
        });

        // Delete old images from Cloudinary after successful update
        if (newImage && oldImages && oldImages.length > 0) {
            for (const img of oldImages) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }

        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'update',
                resource: 'news',
                resourceName: updatedNews.title,
                resourceId: updatedNews._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedNews
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

// Delete news
export const deleteNews = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.deleteById(id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        
        // Delete images from Cloudinary
        if (news.image && news.image.length > 0) {
            for (const img of news.image) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'delete',
                resource: 'news',
                resourceName: news.title,
                resourceId: news._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
