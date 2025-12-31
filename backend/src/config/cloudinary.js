import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for team profile images
const teamStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bankwonogiri/team',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

// Storage for news images
const newsStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bankwonogiri/news',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 800, crop: 'limit' }],
    },
});

// Storage for service images
const serviceStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bankwonogiri/services',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }],
    },
});

// Storage for publication files (PDF)
const publicationStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bankwonogiri/publications',
        allowed_formats: ['pdf'],
        resource_type: 'raw', // Important for non-image files like PDF
    },
});

// Create multer instances with file size limits
export const uploadTeam = multer({ 
    storage: teamStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadNews = multer({ 
    storage: newsStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadService = multer({ 
    storage: serviceStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadPublication = multer({ 
    storage: publicationStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max for PDFs
});

// Helper to delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
    try {
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/filename.ext
    const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
    return matches ? matches[1] : null;
};

export default cloudinary;
