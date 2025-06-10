import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  lastSpin: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
})

// Prevent mongoose from creating a new model if it already exists
export default mongoose.models.User || mongoose.model('User', userSchema) 