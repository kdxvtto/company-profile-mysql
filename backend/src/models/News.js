import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        enum: ["Berita", "Pengumuman", "Promosi"],
        default: "Berita",
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true
}
);
newsSchema.index({ category: 1 })
newsSchema.index({ title: 1 })
newsSchema.index({ createdAt: -1 })

export default mongoose.model("News", newsSchema);