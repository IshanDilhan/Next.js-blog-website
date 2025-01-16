"use client";
import { useState } from "react";
import axios from "axios";

const MyBlogsPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "My First Blog",
      content: "This is my first blog post!",
      image: "/my-first-blog.jpg",
    },
    {
      id: 2,
      title: "My Travel Diary",
      content: "Exploring new destinations...",
      image: "/travel-diary.jpg",
    },
    {
      id: 3,
      title: "Tech Trends",
      content: "The future of technology is here!",
      image: "/tech-trends.jpg",
    },
  ]);

  const handleVerify = async () => {
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/verify", {
        email,
        phoneNumber,
      });
      
      
       console.log(response)
      // Assuming the API returns a success message or status
      if (response.data.success) {
        setIsVerified(true);
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("An error occurred. Please try again.");
    }
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
              handleVerify();
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="border rounded-lg overflow-hidden shadow-md">
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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      Modify
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
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
