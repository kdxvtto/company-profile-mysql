import News from "../models/News.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";
import mongoose from "mongoose";

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
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

// Get news by ID
export const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.findById(id);
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
        // Image harus berupa array sesuai model
        const news = new News({
            title,
            content,
            image: [image],
            date,
            category
        });
        const newNews = await news.save();
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
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.findById(id);
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
        if (newImage) {
            news.image = [newImage];
        }
        Object.assign(news, req.body);
        await news.save();

        // Delete old images from Cloudinary after successful update
        if (newImage && oldImages && oldImages.length > 0) {
            for (const img of oldImages) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }

        res.status(200).json({
            success: true,
            data: news
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
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        const news = await News.findByIdAndDelete(id);
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
