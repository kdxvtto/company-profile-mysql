import News from "../models/News.js";
import Services from "../models/Services.js";
import Publications from "../models/Publications.js";
import TeamProfile from "../models/TeamProfile.js";
import Gallery from "../models/Gallery.js";

// Search across news and services
export const search = async (req, res) => {
    try {
        const rawQuery = typeof req.query.q === "string" ? req.query.q.trim() : "";

        if (!rawQuery) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const query = rawQuery.slice(0, 100);
        const limit = 5;

        const [
            newsResults,
            servicesResults,
            publicationsResults,
            teamProfilesResults,
            galleryResults,
        ] = await Promise.all([
            News.search(query, limit),
            Services.search(query, limit),
            Publications.search(query, limit),
            TeamProfile.search(query, limit),
            Gallery.search(query, limit),
        ]);

        res.status(200).json({
            success: true,
            data: {
                news: newsResults,
                services: servicesResults,
                publications: publicationsResults,
                teamProfiles: teamProfilesResults,
                gallery: galleryResults,
                totalResults:
                    newsResults.length +
                    servicesResults.length +
                    publicationsResults.length +
                    teamProfilesResults.length +
                    galleryResults.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
