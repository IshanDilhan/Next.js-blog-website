"use client";
import { useState } from "react";

const AllBlog = () => {
  const [latestBlogs, setLatestBlogs] = useState([
    { id: 1, title: "AI Revolution", image: "/ai-revolution.jpg", content: "Discover the future of AI..." },
    { id: 2, title: "Tech Trends 2025", image: "/tech-trends.jpg", content: "What's coming in technology..." },
    { id: 3, title: "Health and Wellness", image: "/wellness.jpg", content: "Tips for a healthier life..." },
  ]);

  const [blogs, setBlogs] = useState([
    { id: 4, title: "Travel the World", image: "/travel.jpg", content: "Explore new places..." },
    { id: 5, title: "Cooking Made Easy", image: "/cooking.jpg", content: "Delicious recipes..." },
    { id: 6, title: "Fitness Tips", image: "/fitness.jpg", content: "Stay fit and active..." },
    { id: 7, title: "Photography Basics", image: "/photography.jpg", content: "Capture stunning photos..." },
  ]);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to All Blogs</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Latest Blogs */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className="border rounded-lg overflow-hidden shadow-md">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Blogs */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="border rounded-lg overflow-hidden shadow-md">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllBlog;
