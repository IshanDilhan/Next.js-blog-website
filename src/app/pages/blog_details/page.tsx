"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Blog {
  _id: string;
  blogTitle: string;
  description: string;
  blogType: string;
  images: string[]; // Array of image URLs
  author: {
    name: string;
    email: string;
    country: string;
    phoneNumber: string;
    userImage: string | null; // Optional profile image of the author
  };
  createdAt: string; // ISO 8601 formatted date string
}

interface Comment {
  username: string;
  text: string;
  blogId: string;
}

const BlogDetails = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");

  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]); // State to store comments
  const [username, setUsername] = useState(""); // State to store username
  const [commentText, setCommentText] = useState(""); // State to store comment text

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/getblogbyid?blogId=${blogId}`);
        const data = await response.json();

        if (response.ok) {
          setBlogDetails(data.blog);
        } else {
          setError(data.message || "Failed to fetch blog details");
        }
      } catch (error) {
        setError("An error occurred while fetching blog details");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  // Fetch comments when the blogId is available
  useEffect(() => {
    const fetchComments = async () => {
      if (blogId) {
        try {
          const response = await fetch(`/api/getCommentIdByBlogId?blogId=${blogId}`);
          const data = await response.json();

          if (response.ok) {
            setComments(data.comments); // Set fetched comments
          } else {
            setError(data.message || "Failed to fetch comments");
          }
        } catch (error) {
          setError("An error occurred while fetching comments");
        }
      }
    };

    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && commentText) {
      const newComment = { username, text: commentText , blogId: blogId as string};
      setComments([...comments, newComment]);
      setUsername(""); // Reset username input
      setCommentText(""); // Reset comment input
  console.log(newComment)
      try {
        // Await the axios request to ensure the response is received before proceeding
        const response = await axios.post("/api/savecomment", newComment, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type
          },
        });
  
        // Check if the response is successful
        if (response.status === 200 || response.status === 201) {
          console.log("Comment posted successfully", response.data);
        } else {
          setError("Failed to post comment.");
        }
      } catch (error) {
        setError("An error occurred while posting the comment.");
        console.error("Error posting comment:", error);
      }
    } else {
      setError("Please fill out both username and comment.");
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading blog details...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <p className="text-gray-600 text-lg">{error}</p>
  //     </div>
  //   );
  // }

  if (!blogDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">No blog found with the given ID.</p>
      </div>
    );
  }

  const { blogTitle, description, images, author, createdAt } = blogDetails;

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Blog Details and Comments Section */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-semibold text-gray-800">{blogTitle}</h1>
            <p className="text-lg text-gray-600 mt-2">{description}</p>
            <p className="text-sm text-gray-500 mt-6">
              Published on {new Date(createdAt).toLocaleString()} by {author.name}
            </p>
            <div className="flex items-center mt-4">
              <img
                src={author.userImage || "/placeholder.jpg"}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-gray-800 font-semibold">{author.name}</p>
                <p className="text-gray-600">{author.country}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>

              {/* Display Comments */}
              <div className="space-y-4 mt-4">
                {comments.map((comment, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                    <p className="text-gray-800 font-semibold">{comment.username}</p>
                    <p className="text-gray-600 mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <div className="border rounded-lg p-4 shadow-sm bg-gray-50 mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Add a Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <div className="space-y-4 mt-4">
                    <input
                      type="text"
                      className="w-full border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                      className="w-full border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your comment here..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side: Image Carousel */}
          <div className="relative order-1 lg:order-2">
            <img
              src={images[currentImageIndex] || "/placeholder.jpg"}
              alt={`Blog image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevImage}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900"
              >
                &#8249;
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextImage}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900"
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
