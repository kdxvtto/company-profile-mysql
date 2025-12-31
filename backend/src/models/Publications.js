import mongoose from "mongoose";

const publicationsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        enum : ["Laporan", "Manual Book"],
        default : "Laporan"
    },
    file : {
        type : [String],
        required : true,
    }
},{
    timestamps : true
}
)

publicationsSchema.index({ category: 1 })
publicationsSchema.index({ name: 1 })
publicationsSchema.index({ createdAt: -1 })

export default mongoose.model("Publications", publicationsSchema);
