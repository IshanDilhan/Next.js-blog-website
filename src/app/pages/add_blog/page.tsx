"use client";
import { useState } from "react";

const AddBlog = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <main className="max-w-4xl w-full mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-xl mt-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Add New Blog</h2>

        {/* Blog Submission Form */}
        <form className="space-y-6">
          {/* Blog Title and Blog Type */}
          
          {/* Blog Images */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Blog Images (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Blog Title</label>
              <input
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your blog title"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Blog Type</label>
              <input
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter blog type (e.g., Technology, Lifestyle)"
              />
            </div>
          </div>

          {/* Your Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Country and Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Country</label>
              <input
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your country"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* User Image */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Your Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>


          {/* Blog Description */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Blog Description</label>
            <textarea
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your blog description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-md text-xl font-semibold hover:bg-gradient-to-l focus:outline-none transition"
          >
            Add Blog
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddBlog;
