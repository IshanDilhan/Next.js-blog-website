"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
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
const MyBlogsPage = () => {
  const router = useRouter();
  const [Islogged, setIslogged] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]); // Store fetched blogs
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]); // Store blogs after verification
  const searchParams = useSearchParams();
  const gotloggedmessage = searchParams.get("Isloged");
  const emailaddress = searchParams.get("email");
  const tp = searchParams.get("tp");

  // Fetch blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/getblogs");
        const data = response.data.blogs;
        console.log(data);
        setBlogs(data || []); // Set all blogs to state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []); // This effect only runs once to fetch the blogs when the component mounts

  useEffect(() => {
    // This effect runs when the "Isloged" parameter changes and when the blogs are fetched
    if (gotloggedmessage === "true" && emailaddress && tp) {
      setIslogged(true);
      const verifiedBlogs = blogs.filter(
        (blog) =>
          blog.author.email === emailaddress && blog.author.phoneNumber === tp
      );

      if (verifiedBlogs.length > 0) {
        setIsVerified(true); // If there are blogs matching the email and phone number
        setFilteredBlogs(verifiedBlogs); // Display only verified blogs
      } else {
        console.log("No blogs found with the provided credentials.");
        //setFilteredBlogs([]); // Clear the filtered blogs if no match is found
      }
    }
  }, [gotloggedmessage, emailaddress, tp, blogs]); // Dependencies for this effect: login message, email, phone, and blogs
  const handleVerify = () => {
    const verifiedBlogs = blogs.filter(
      (blog) =>
        blog.author.email === email && blog.author.phoneNumber === phoneNumber
    );

    if (verifiedBlogs.length > 0) {
      setIsVerified(true); // If there are blogs matching the email and phone number
      setFilteredBlogs(verifiedBlogs); // Display only verified blogs
    } else {
      alert("No blogs found with the provided credentials.");
      setFilteredBlogs([]); // Clear the filtered blogs if no match is found
    }
  };
  // Handle blog deletion
  const deleteBlog = async (id: string) => {
    try {
      const response = await axios.delete(`/api/deleteBlog?blogId=${id}`);
      if (response.data.success) {
        setFilteredBlogs(filteredBlogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully.");
        router.push(`/pages/home`);
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };
  const handleBlogClick = (blog: Blog) => {
    router.push(`/pages/blog_details?blogId=${blog._id}`);
  };

  // Handle blog modification
  const updateBlog = (id: string) => {
    router.push(`/pages/modifyblog?blogId=${id}`);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <main className="max-w-4xl w-full mx-auto p-8   mt-10">
        {!isVerified ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Verify Your Identity
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerify(); // Call handleVerify when form is submitted
                }}
              >
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-black"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-600 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-black"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl mt-15">
  {/* Section Title */}
  <h2 className="text-4xl font-extrabold text-white mb-10 text-center tracking-wide">
    Verified Blogs
  </h2>

  {/* Blog Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {filteredBlogs.map((blog) => (
      <div
        key={blog._id}
        className="bg-white border border-gray-600 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => handleBlogClick(blog)}
      >
        {/* Blog Image */}
        <img
          src={blog.images?.[0] || "/placeholder.jpg"}
          alt={blog.blogTitle}
          className="w-full h-52 object-cover rounded-t-lg"
        />

        {/* Blog Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
            {blog.blogTitle}
          </h3>
          {/* Blog Type */}
          <h4 className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Type:</span> {blog.blogType}
          </h4>
          {/* Author */}
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">by:</span> {blog.author.name || "Unknown"}
          </p>
          {/* Date */}
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Added on:</span>{" "}
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateBlog(blog._id);
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition"
            >
              Modify
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBlog(blog._id);
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        )}
      </main>
    </div>
  );
};

export default MyBlogsPage;
