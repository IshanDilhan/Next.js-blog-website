"use client";
import { useState } from "react";
import Slider from "react-slick"; // Install react-slick and slick-carousel for carousel functionality
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const router = useRouter();
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleBlogClick = () => {
    
    router.push(`/pages/blog_details`);
  };

  return (
    <div className="bg-white">
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Blog Hub</h1>
        <p className="mt-2">Discover the latest and greatest blogs curated just for you!</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Latest Blogs Carousel */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Blogs</h2>
          <Slider {...carouselSettings}>
            {latestBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 cursor-pointer"
                onClick={() => handleBlogClick()}
              >
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <h3 className="text-2xl font-semibold">{blog.title}</h3>
                    <p className="text-sm">{blog.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Other Blogs */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore More Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleBlogClick()}
              >
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

export default Home;
