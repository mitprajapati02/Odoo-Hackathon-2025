import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialMediaApp',
    required: true,
  },
  reminder: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model('Reminder', reminderSchema);
