"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddBlog = () => {
  const router = useRouter();
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
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...Array.from(files)], // Append new files to the existing array
        }));
      } else if (name === "userImage") {
        setFormData((prev) => ({ ...prev, userImage: files[0] })); // For a single file
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare FormData to send
      const formDataToSend = new FormData();

      // Add blogData as a JSON string
      formDataToSend.append(
        "blogData",
        JSON.stringify({
          blogTitle: formData.blogTitle,
          blogType: formData.blogType,
          name: formData.name,
          email: formData.email,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
          description: formData.description,
          userImage: formData.userImage,
        })
      );

      // Add images
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Add userImage if available
      if (formData.userImage) {
        formDataToSend.append("userImage", formData.userImage);
      }

      // Send data via POST request
      const res = axios.post("/api/addblog", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });
      console.log(formDataToSend);
      console.log(res);

      // Reset form data
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

      router.push(`/pages/home`);
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
            <div className="flex flex-wrap gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }));
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1 hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
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

          {/* Your Name and Email Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
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

            {/* Email Input */}
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

          {/* Image Upload Preview Section */}
          <div className="flex flex-wrap gap-4 mt-4">
            {formData.userImage && ( // Conditional rendering to display only if userImage exists
              <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(formData.userImage)} // Generate URL for the user image
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      userImage: null, // Set userImage to null to remove it
                    }));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1 hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            )}
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
