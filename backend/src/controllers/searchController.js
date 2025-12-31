import News from "../models/News.js";
import Services from "../models/Services.js";
import Publications from "../models/Publications.js";
import TeamProfile from "../models/TeamProfile.js";

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

        // Search in Publications
        const publicationsResults = await Publications.find({
            $or: [
                { name: searchRegex },
                { category: searchRegex }
            ]
        }).limit(5).select('_id name category file');

        // Search in Team Profile
        const teamProfilesResults = await TeamProfile.find({
            $or: [
                { name: searchRegex },
                { position: searchRegex }
            ]
        }).limit(5).select('_id name position image');

        res.status(200).json({
            success: true,
            data: {
                news: newsResults,
                services: servicesResults,
                publications: publicationsResults,
                teamProfiles: teamProfilesResults,
                totalResults: newsResults.length + servicesResults.length + publicationsResults.length + teamProfilesResults.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
