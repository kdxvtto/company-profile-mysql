// Wrong before: async pre hooks used next() and checked this.password < 6, causing next is not a function and bad validation
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password") || this.isNew) {
    if (!this.password || this.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const saltRounds = parseInt(process.env.SALT_ROUND, 10) || 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
});

userSchema.pre("findOneAndUpdate", async function () {
  if (this._update.password) {
    if (this._update.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const saltRounds = parseInt(process.env.SALT_ROUND, 10) || 10;
    const hashedPassword = await bcrypt.hash(this._update.password, saltRounds);
    this._update.password = hashedPassword;
  }
});

userSchema.index({ email: 1 })
userSchema.index({ refreshToken: 1 })

export default mongoose.model("User", userSchema);
