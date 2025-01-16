import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    blogTitle: { type: String, required: true },
    blogType: { type: String },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      country: { type: String },
      phoneNumber: { type: String },
      userImage: { type: String }, // URL or base64 string
    },
    description: { type: String, required: true },
    images: [{ type: String }], // URLs or base64 strings
  },
  { timestamps: true }
);

  const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
module.exports = Blog;