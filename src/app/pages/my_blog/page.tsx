"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

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

  // Handle blog modification
  const updateBlog = (id: string) => {
    router.push(`/pages/modifyblog?blogId=${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4">
      {!isVerified ? (
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
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
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Verified Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id} // Assuming `id` is unique for each blog
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{blog.content}</p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => updateBlog(blog._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
    </div>
  );
};

export default MyBlogsPage;
