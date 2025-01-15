import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Discover the latest stories, insights, and articles crafted just for you.
        </p>
        <div className="flex justify-center">
          <Link
            href="/pages"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Go to About Page
          </Link>
        </div>
      </div>
    </div>
  );
}
