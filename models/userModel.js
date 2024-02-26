import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, " Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
    //   education: [{
//     degree: { type: String },
//     institution: { type: String },
//     year: { type: Number },
//   }],
//   experience: [{
//     position: { type: String },
//     company: { type: String },
//     year: { type: Number },
//   }],
//   links: {
//     portfolio: { type: String }, // Link to the user's portfolio
//     linkedinProfile: { type: String }, // Link to the user's LinkedIn profile
//   },
//   appliedForms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }], // Reference to applied job forms
//   // Add other fields as needed
  },
  { timestamps: true }
);
// middelwares
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default mongoose.model("User", userSchema);
