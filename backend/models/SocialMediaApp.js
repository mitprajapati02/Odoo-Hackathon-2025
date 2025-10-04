import mongoose from 'mongoose';

const socialMediaAppSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    mediaName: { type: String, required: true },
    inMediaUsername: {
      type: String,
      unique: true,
      required: true,
    },
    bio: { type: String, maxlength: 500 },

    states: {
      stat1: { type: String },
      stat2: { type: String },
      stat3: { type: String },
    },

    values: {
      value1: { type: String },
      value2: { type: String },
      value3: { type: String },
    },

    tags: [{ type: String, default: [] }],

    url: { type: String, default: '' },

    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' }],
    todoLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoList' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SocialMediaApp', socialMediaAppSchema);
