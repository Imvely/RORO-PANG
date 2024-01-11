import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true, maxLength: 80 },
  description: { type: String, require: true, trim: true, minLength: 20 },
  createdAt: { type: Date, require: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, require: true },
    rating: { type: Number, default: 0, require: true },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
