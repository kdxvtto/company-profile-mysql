import Services from "../models/Services.js";
import { removeFile } from "../utils/file.js";
import mongoose from "mongoose";

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json({
            success: true,
            data : services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}

// Get service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ 
                success: false,
                message: "Service not found" 
            });
        }
        const service = await Services.findById(id);
        if(!service) {
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
}

// Create new service
export const createService = async (req,res) => {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    try{
        const { title, content, category } = req.body;
        if(!title || !content || !image) {
            // Jangan biarkan file tersisa jika payload tidak lengkap
            if(image) await removeFile(image);
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }
        const service = new Services({ title, content, image, category });
        const newService = await service.save();
        res.status(201).json({
            success: true,
            data : newService
        });
    } catch (error) {
        if(image) await removeFile(image);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Update service
export const updateService = async (req,res) => {
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }
        const service = await Services.findById(id);
        if(!service) {
            if(newImage) await removeFile(newImage);
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }

        const oldImage = service.image;
        if(newImage) {
            service.image = newImage;
        }
        Object.assign(service, req.body);
        await service.save();

        // Update berhasil, hapus gambar lama jika diganti
        if(newImage && oldImage) {
            await removeFile(oldImage);
        }

        res.status(200).json({
            success: true,
            data : service
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

// Delete service
export const deleteService = async (req,res) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }
        const service = await Services.findByIdAndDelete(id);
        if(!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found" 
            });
        }
        if(service.image) await removeFile(service.image);
        res.status(200).json({
            success: true,
            data : service
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}
