import mongoose from 'mongoose';

const todoListSchema = new mongoose.Schema({
  app: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaApp' },
  tasks: [
    {
      task: String,
      completed: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model('TodoList', todoListSchema);
