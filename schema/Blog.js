import mongoose from "mongoose";

let blogSchema = mongoose.Schema;

let schema = new blogSchema({
  slug: {
    type: String,
    description: "Unique slug for the blog post",
    required: true,
  },
  title: {
    type: String,
    description: "Title of the blog post",
    required: true,
  },
  author: {
    type: String,
    description: "Author of the blog post",
    required: true,
  },
  category: {
    type: String,
    description: "Category of the blog post (e.g., blogs)",
    required: true,
  },
  createdAt: {
    type: String,
    format: "date-time",
    description: "Creation date and time of the blog post",
    required: true,
  },
  updatedAt: {
    type: String,
    format: "date-time",
    description: "Last update date and time of the blog post",
    required: true,
  },
  readingTime: {
    type: String,
    description: "Estimated reading time of the blog post",
    required: true,
  },
  description: {
    type: String,
    description: "Short description of the blog post",
    required: true,
  },
  content: {
    type: String,
    description: "Main content of the blog post (Markdown format)",
    required: true,
  },
  coverImage: {
    type: String,
    format: "uri",
    description: "URL of the cover image",
  },
});
const Blog = mongoose.model("blogs", schema);

export default Blog;
