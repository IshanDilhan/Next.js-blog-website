"use client";
import axios from "axios";
import { useState } from "react";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogType: "",
    name: "",
    email: "",
    country: "",
    phoneNumber: "",
    description: "",
    images: [] as File[],
    userImage: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "images") {
        setFormData((prev) => ({ ...prev, images: Array.from(files) }));
      } else if (name === "userImage") {
        setFormData((prev) => ({ ...prev, userImage: files[0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = {
        ...formData,
        images: formData.images.map((file) => URL.createObjectURL(file)), // Convert images to base64/URL
        userImage: formData.userImage
          ? URL.createObjectURL(formData.userImage)
          : null,
      };

      const res = await axios.post("/api/addblog", formDataToSend);

      setResponseMessage(res.data.message);
      setFormData({
        blogTitle: "",
        blogType: "",
        name: "",
        email: "",
        country: "",
        phoneNumber: "",
        description: "",
        images: [],
        userImage: null,
      });
    } catch (error: any) {
      console.error("Error submitting blog:", error);
      setResponseMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <main className="max-w-4xl w-full mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-xl mt-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Add New Blog
        </h2>

        {/* Blog Submission Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Blog Images */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Blog Images (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="images"
              onChange={handleFileChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Blog Title and Blog Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Blog Title
              </label>
              <input
                type="text"
                name="blogTitle"
                value={formData.blogTitle}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your blog title"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Blog Type
              </label>
              <input
                type="text"
                name="blogType"
                value={formData.blogType}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter blog type (e.g., Technology, Lifestyle)"
              />
            </div>
          </div>

          {/* Your Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Country and Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your country"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* User Image */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Your Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="userImage"
              onChange={handleFileChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Blog Description */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Blog Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
