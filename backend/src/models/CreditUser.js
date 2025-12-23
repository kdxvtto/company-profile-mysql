// Wrong before: default statusInFamily = \"Anak\" tidak ada di enum, menyebabkan save gagal saat field tidak dikirim.
import mongoose from "mongoose";

const creditUserSchema = new mongoose.Schema({
    applicant : {
        numberIdentity : {
            type: String,
            required: true,
        },
        name : {
            type: String,
            required: true,
        },
        placeOfBirth : {
            type: String,
            required: true,
        },
        dateOfBirth : {
            type: Date,
            required: true,
        },
        gender : {
            type : String,
            enum : ["Laki-laki", "Perempuan"],
            default : "Laki-laki"
        },
        phone : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        },
        address : {
            type: String,
            required: true,
        },
        village : {
            type: String,
            required: true,
        },
        district : {
            type: String,
            required: true,
        },
        city : {
            type: String,
            required: true,
        },
        province : {
            type: String,
            required: true,
        },
        postalCode : {
            type: String,
            required: true,
        },
        job :{
            type: String,
            enum : ["Pegawai Negeri Sipil", "Pegawai Swasta", "Pegawai BUMN", "Pegawai BUMD", "Pedagang", "Peternak", "Petani", "Wiraswasta/Wirausaha"],
            default : "Pegawai Negeri Sipil"
        },
        workPlace : {
            type: String,
            required: true,
        },
        motherName : {
            type: String,
            required: true,
        },
        photo : {
            type: String,
            required: true,
        },
        identityPhoto : {
            type: String,
            required: true,
        },
        maritalStatus : {
            type: String,
            enum : ["Menikah", "Belum Menikah", "Janda", "Duda"],
            default : "Belum Menikah"
        },
        statusInFamily : {
            type: String,
            enum : ["Suami", "Istri", "Anggota Keluarga"],
            default : "Anggota Keluarga"
        },
    },
    family : {
        identityNumber : {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth : {
            type: Date,
            required: true,
        },
        statusOnFamily : {
            type: String,
            enum : ["Suami", "Istri", "Anggota Keluarga"],
            default : "Suami"
        },
        phone : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        },
        address : {
            type: String,
            required: true,
        },
        photo : {
            type: String,
            required: true,
        },
        identityPhoto : {
            type: String,
            required: true,
        },
        familyCard : {
            type: String,
            required: true,
        },
    },
    product : {
        creditType : {
            type: String,
            enum : ["Pilih jenis kredit", "Umum", "Sumeh (Maks 2jt)", "Wonogiren", "Kredit Elektronik", "Sumeh 4%",
            "Sumeh 5%", "Sumeh 6%"],
            default : "Umum"
        },
        creditTerm : {
            type: String,
            enum : ["1 Bulan", "3 Bulan", "6 Bulan", "12 Bulan", "24 Bulan", "36 Bulan"],
            default : "1 Bulan"
        },
        creditAmount : {
            type: Number,
            required: true,
        },
        purpose : {
            type: String,
            required: true,
        }
    },
    income : {
        incomePicture : {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    outcome : {
        amount: {
            type: Number,
            required: true,
        },
    },
    approval : {
        status : {
            type: String,
            enum : ["Ditolak", "Diterima", "Menunggu"],
            default : "Menunggu"
        }
    }
},
{
    timestamps: true
}
);

export default mongoose.model("CreditUser", creditUserSchema);
