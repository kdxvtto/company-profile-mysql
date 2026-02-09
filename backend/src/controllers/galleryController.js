import Gallery from "../models/Gallery.js";
import { getPublicIdFromUrl } from "../config/cloudinary.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";
import { createActivityLog } from "./activityLogController.js";
import { parseId } from "../utils/parseId.js";

export const getGallery = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const gallery = await Gallery.getAll({ page, limit });
        const totalGallery = await Gallery.count();
        const totalPages = Math.ceil(totalGallery / limit);
        return res.status(200).json({
            success : true,
            data : gallery,
            pagination: {
                totalGallery,
                totalPages,
                currentPage: page,
                limit
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

export const createGallery = async (req, res) => {
    const image = req.file ? req.file.path : null;
    try {
        const { title, content } = req.body;
        if (!title || !content || !image) {
            return res.status(400).json({
                success : false,
                message : "Bad Request"
            })
        }
        const gallery = await Gallery.create({ title, content, image : [image] });
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'create',
                resource: 'gallery',
                resourceName: gallery.title,
                resourceId: gallery._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(201).json({
            success : true,
            data : gallery
        })
    } catch (error) {
        if (image) {
            const publicId = getPublicIdFromUrl(image);
            await deleteFromCloudinary(publicId);
        }
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const updateGallery = async (req, res) => {
    const newImage = req.file ? req.file.path : null;
    try {
        const id = parseId(req.params.id);
        if(!id) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success : false,
                message : "Not Found"
            })
        }
        const gallery = await Gallery.getById(id);
        if (!gallery) {
            if (newImage) {
                const publicId = getPublicIdFromUrl(newImage);
                await deleteFromCloudinary(publicId);
            }
            return res.status(404).json({
                success : false,
                message : "Not Found"
            })
        }
        const oldImages = gallery.image;
        const updatedGallery = await Gallery.update(id, {
            ...req.body,
            ...(newImage ? { image: [newImage] } : {})
        });
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
                resource: 'gallery',
                resourceName: updatedGallery.title,
                resourceId: updatedGallery._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(200).json({
            success : true,
            data : updatedGallery
        })
    } catch (error) {
        if (newImage) {
            const publicId = getPublicIdFromUrl(newImage);
            await deleteFromCloudinary(publicId);
        }
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const deleteGallery = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if(!id) {
            return res.status(404).json({
                success : false,
                message : "Gallery not found"
            })
        }
        const gallery = await Gallery.deleteById(id);
        if (!gallery) {
            return res.status(404).json({
                success : false,
                message : "Gallery not found"
            })
        }
        if (gallery.image && gallery.image.length > 0) {
            for (const img of gallery.image) {
                const publicId = getPublicIdFromUrl(img);
                await deleteFromCloudinary(publicId);
            }
        }
        
        // Log activity
        if (req.user) {
            await createActivityLog({
                action: 'delete',
                resource: 'gallery',
                resourceName: gallery.title,
                resourceId: gallery._id,
                userId: req.user.id,
                userName: req.user.name || 'Admin'
            });
        }
        
        return res.status(200).json({
            success : true,
            data : gallery
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
