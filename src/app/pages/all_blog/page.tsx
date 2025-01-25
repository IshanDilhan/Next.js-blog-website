"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const AllBlog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/getblogs");
        const data = response.data.blogs;
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog: Blog) => {
    router.push(`/pages/blog_details?blogId=${blog._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
<header className="bg-green-100 text-green-800 py-8 text-center shadow-sm">
  <h1 className="text-4xl font-bold">All Blogs</h1>
  <p className="mt-2 text-green-700">
    Discover the latest and greatest blogs curated just for you!
  </p>
</header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.images?.[0] || "/placeholder.jpg"}
                  alt={blog.blogTitle}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {blog.blogTitle}
                  </h3>
                  <h4 className="text-gray-600 text-sm">
                    <span className="font-medium">Type:</span> {blog.blogType}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">by:</span>{" "}
                    {blog.author.name || "Unknown"}
                    <span className="font-medium mx-2">{" | "}</span>
                    <span className="font-medium">Added on:</span>{" "}
                    {new Date(blog.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
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
