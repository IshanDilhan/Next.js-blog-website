"use client";
import { useState } from "react";

const BlogDetails = () => {
  const blog = {
    id: 1,
    title: "AI Revolution: How AI is Shaping the Future",
    image: "/ai-revolution.jpg",
    content:
      "Artificial intelligence (AI) is rapidly transforming industries across the globe. From healthcare to finance, AI is paving the way for smarter and more efficient solutions. In this blog, we explore how AI is changing the world and what the future holds for this groundbreaking technology.",
    postedAt: "2025-01-15 14:30",
  };

  const [comments, setComments] = useState([
    { id: 1, user: "John Doe", comment: "Great blog! Very informative." },
    { id: 2, user: "Jane Smith", comment: "Loved the insights on AI trends!" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [hearts, setHearts] = useState(25);

  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      { id: comments.length + 1, user: "Anonymous", comment: newComment },
    ]);
    setNewComment("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Blog Details */}
      <div className="mb-8 border rounded-lg shadow-md overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500">
            Posted on {new Date(blog.postedAt).toLocaleString()}
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">{blog.content}</p>
        </div>
      </div>

      {/* Hearts Section */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => setHearts(hearts + 1)}
          className="text-red-500 hover:text-red-700 text-2xl mr-3 focus:outline-none"
          aria-label="Add Heart"
        >
          ❤️
        </button>
        <p className="text-gray-800 font-semibold text-lg">{hearts} Hearts</p>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

        {/* Display Comments */}
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <p className="text-gray-800 font-semibold">{comment.user}</p>
              <p className="text-gray-600 mt-1">{comment.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="border rounded-lg p-4 shadow-md bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Add a Comment</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            //rows="3"
            className="w-full border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            onClick={addComment}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
