import mongoose from "mongoose";

const teamProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
},{
    timestamps: true
}
);

teamProfileSchema.index({ name: 1 })
teamProfileSchema.index({ position: 1 })
teamProfileSchema.index({ createdAt: -1 })
teamProfileSchema.index({ facebook: 1 }, { sparse: true })
teamProfileSchema.index({ instagram: 1 }, { sparse: true })

export default mongoose.model("TeamProfile", teamProfileSchema);