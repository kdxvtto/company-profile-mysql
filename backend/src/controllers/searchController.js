import News from "../models/News.js";
import Services from "../models/Services.js";

// Search across news and services
export const search = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const searchRegex = new RegExp(q, 'i');

        // Search in News
        const newsResults = await News.find({
            $or: [
                { title: searchRegex },
                { content: searchRegex }
            ]
        }).limit(5).select('_id title content category date createdAt');

        // Search in Services
        const servicesResults = await Services.find({
            $or: [
                { title: searchRegex },
                { content: searchRegex }
            ]
        }).limit(5).select('_id title content category');

        res.status(200).json({
            success: true,
            data: {
                news: newsResults,
                services: servicesResults,
                totalResults: newsResults.length + servicesResults.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
