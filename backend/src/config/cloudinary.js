import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
]);
const pdfMimeTypes = new Set([
    "application/pdf",
    "application/x-pdf",
]);

const makeFileFilter = (allowedMimeTypes, label) => (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
        const error = new Error(`Invalid ${label} file type`);
        error.status = 400;
        return cb(error, false);
    }
    return cb(null, true);
};

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

// Storage for gallery images
const galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bankwonogiri/gallery',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }],
    },
});

// Create multer instances with file size limits
export const uploadTeam = multer({ 
    storage: teamStorage,
    fileFilter: makeFileFilter(imageMimeTypes, "image"),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadNews = multer({ 
    storage: newsStorage,
    fileFilter: makeFileFilter(imageMimeTypes, "image"),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadService = multer({ 
    storage: serviceStorage,
    fileFilter: makeFileFilter(imageMimeTypes, "image"),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max for images
});
export const uploadPublication = multer({ 
    storage: publicationStorage,
    fileFilter: makeFileFilter(pdfMimeTypes, "document"),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max for PDFs
});

export const uploadGallery = multer({ 
    storage: galleryStorage,
    fileFilter: makeFileFilter(imageMimeTypes, "image"),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max for images
});

// Helper to delete file from Cloudinary
// resourceType: 'image' for images, 'raw' for PDFs
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        if (publicId) {
            await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        }
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    // URL formats:
    // Image: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/filename.ext
    // Raw: https://res.cloudinary.com/cloud_name/raw/upload/v123/folder/filename.pdf
    const matches = url.match(/\/v\d+\/(.+)$/);
    return matches ? matches[1] : null;
};

export default cloudinary;
