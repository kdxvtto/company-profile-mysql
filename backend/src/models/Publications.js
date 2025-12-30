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

export default mongoose.model("Publications", publicationsSchema);
