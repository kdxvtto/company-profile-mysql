// Wrong before: schema tidak menyertakan content padahal controller memerlukannya.
// Before:
// const servicesSchema = new mongoose.Schema({ title: String, image: String })
import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Kredit", "Tabungan", "Deposito"],
        default: "Kredit",
    },
},{
    timestamps: true
}
);

export default mongoose.model("Services", servicesSchema);

