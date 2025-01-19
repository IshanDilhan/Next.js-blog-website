"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BlogDetails = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");

  // State for storing blog details and loading state
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`/api/getblogbyid?blogId=${blogId}`);
        const data = await response.json();

        if (response.ok) {
          setBlogDetails(data.blog);
          console.log(data.blog)
        } else {
          setError(data.message || "Failed to fetch blog details");
        }
      } catch (error) {
        console.log("An error occurred while fetching blog details");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  // Loading and error handling
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>Loading blog details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>{error}</p>
      </div>
    );
  }

  // If no blog details are found
  if (!blogDetails) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>No blog found with the given ID.</p>
      </div>
    );
  }

  // Destructuring the blog details
  const { title, image, content, postedAt } = blogDetails;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Blog Details */}
      <div className="mb-8 border rounded-lg shadow-md overflow-hidden">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-sm text-gray-500">
            Posted on {new Date(postedAt).toLocaleString()}
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            {content}
          </p>
        </div>
      </div>

      {/* Hearts Section */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => {}}
          className="text-red-500 hover:text-red-700 text-2xl mr-3 focus:outline-none"
          aria-label="Add Heart"
        >
          ❤️
        </button>
        <p className="text-gray-800 font-semibold text-lg">25 Hearts</p>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

        {/* Display Comments */}
        <div className="space-y-4 mb-6">
          {/* Placeholder for comments */}
          <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
            <p className="text-gray-800 font-semibold">John Doe</p>
            <p className="text-gray-600 mt-1">Great blog! Very informative.</p>
          </div>
        </div>

        {/* Add Comment */}
        <div className="border rounded-lg p-4 shadow-md bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Add a Comment</h3>
          <textarea
            className="w-full border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your comment here..."
          ></textarea>
          <button
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
