import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, require: true },
  thumbUrl: { type: String, require: true },
  description: { type: String, require: true, trim: true, minLength: 2 },
  createdAt: { type: Date, require: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, require: true },
  },
  comments:[{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
