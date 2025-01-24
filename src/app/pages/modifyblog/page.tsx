"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";
const EditBlog = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("blogId");
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

  useEffect(() => {
    if (id) {
      // Fetch the blog details by ID
      const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/getblogbyid?blogId=${id}`);
            const data = await response.json();
        //   const response = await axios.get(`/api/getblogbyid?blogId=${id}`);
          console.log(data.blog)
          setFormData({
            blogTitle: data.blog.blogTitle,
            blogType: data.blog.blogType,
            name: data.blog.author.name,
            email: data.blog.author.email,
            country: data.blog.author.country,
            phoneNumber: data.blog.author.phoneNumber,
            description: data.blog.description,
            images: data.blog.images || [], // Assuming images are in an array
            userImage: null, // Keeping userImage null for now
          });
        } catch (error) {
          console.error("Error fetching blog data:", error);
          setResponseMessage("An error occurred while fetching the blog data.");
        }
      };

      fetchBlogData();
    }
  }, [id]);

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
      const formDataToSend = new FormData();

      formDataToSend.append("blogData", JSON.stringify({
        blogTitle: formData.blogTitle,
        blogType: formData.blogType,
        name: formData.name,
        email: formData.email,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        description: formData.description,
        userImage: formData.userImage,
      }));
       
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      if (formData.userImage) {
        formDataToSend.append("userImage", formData.userImage);
      }
       console.log(formDataToSend)
      const res = await axios.put(`/api/updateBlog?blogId=${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

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
      setResponseMessage("Blog updated successfully");
      router.push(`/pages/my_blog?Isloged=true&email=${formData.email}&tp=${formData.phoneNumber}`);
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
          Edit Blog
        </h2>

        {/* Blog Edit Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
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
          <div className="flex flex-wrap gap-4 justify-start">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden"
              >
                {/* <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                /> */}
                {/* {index > 0 && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded Preview ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                )} */}

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

          {/* Form Fields */}
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
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter your blog description"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold disabled:bg-gray-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>

        {responseMessage && (
          <div
            className="mt-4 p-4 text-center bg-green-100 text-green-800 rounded-lg"
            role="alert"
          >
            {responseMessage}
          </div>
        )}
      </main>
    </div>
  );
};

export default EditBlog;
