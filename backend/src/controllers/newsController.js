import News from "../models/News.js";
import { removeFile } from "../utils/file.js";
import mongoose from "mongoose";

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({
            success: true,
            data : news
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
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "News not found" });
        }
        const news = await News.findById(id);
        if(!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Create news
export const createNews = async (req,res) => {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    try{
        const { title, content, date, category } = req.body;
        if(!title || !content || !image) {
            // Jika payload kurang, hapus file yang terlanjur di-upload
            if(image) await removeFile(image);
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
        // Image harus berupa array sesuai model
        const news = new News({ 
            title, 
            content, 
            image: [image],  // Simpan sebagai array
            date, 
            category 
        });
        const newNews = await news.save();
        res.status(201).json({
            success: true,
            data : newNews
        });
    } catch (error) {
        if(image) await removeFile(image);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update news
export const updateNews = async (req,res) => {
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }
        const news = await News.findById(id);
        if(!news) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }

        const oldImage = news.image;
        if(newImage) {
            news.image = newImage;
        }
        Object.assign(news, req.body);
        await news.save();

        // Setelah update sukses, hapus gambar lama jika ada pengganti
        if(newImage && oldImage) {
            await removeFile(oldImage);
        }

        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        // Jika gagal simpan, bersihkan file baru
        if(newImage) await removeFile(newImage);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Delete news
export const deleteNews = async (req,res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }
        const news = await News.findByIdAndDelete(id);
        if(!news) {
            return res.status(404).json({
                success: false,
                message: "News not found" 
            });
        }
        // Handle image sebagai array
        if(news.image && news.image.length > 0) {
            for(const img of news.image) {
                await removeFile(img);
            }
        }
        res.status(200).json({
            success: true,
            data : news
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
