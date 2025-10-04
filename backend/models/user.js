import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    profession: { type: String, required: true },
    age: { type: Number },
    password: { type: String, required: true },
    token: { type: String, unique: true },
    socialMediaApps: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaApp' },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
