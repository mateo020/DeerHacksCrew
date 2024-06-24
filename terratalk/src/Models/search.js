import mongoose from 'mongoose';

const SearchSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  user: {
    type: String, // Assuming you have user authentication, store user ID here
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Search || mongoose.model('Search', SearchSchema);
