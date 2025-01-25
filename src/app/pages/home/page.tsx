"use client";
import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick"; // Install react-slick and slick-carousel for carousel functionality
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Define the Blog type structure
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

const Home = () => {
  const router = useRouter();
  const [Blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/getblogs");
        const data = response.data.blogs;
        console.log(response.data.blogs);
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Custom Arrow Component
  const CustomArrow = ({ className, style, onClick }: any) => (
    <div
      className={`${className} bg-purple-500 rounded-full p-2`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "-10px" }} className="absolute mx-auto w-full">
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  const handleBlogClick = (blog: Blog) => {
    router.push(`/pages/blog_details?blogId=${blog._id}`);
  };

  return (
    <div className="bg-white">
      <header className="bg-green-100 text-green-800 py-8 text-center shadow-sm">
        <h1 className="text-4xl font-bold">Welcome to the Blog Hub</h1>
        <p className="mt-2 text-green-700">
          Discover the latest and greatest blogs curated just for you!
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Latest Blogs Carousel */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Latest Blogs
          </h2>
          {Blogs.length > 0 ? (
            <Slider {...carouselSettings}>
              {Blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-5 cursor-pointer"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={blog.images?.[0] || "/placeholder.jpg"}
                      alt={blog.blogTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                      <h3 className="text-2xl font-semibold">
                        {blog.blogTitle}
                      </h3>
                      <p className="text-sm">{blog.blogType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No blogs available at the moment. Please check back later.</p>
          )}
        </section>

        {/* Explore More Blogs */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Explore More Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Blogs.map((blog) => (
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

export default Home;
