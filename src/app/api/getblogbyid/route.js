import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function GET(req) {
  try {
    // Parse the query parameters
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    // Validate blogId
    if (!blogId) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Fetch the blog from the database
    const blog = await Blog.findById(blogId);

    // Handle blog not found
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Return the blog details
    return NextResponse.json(
      { success: true, blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching the blog", error: error.message },
      { status: 500 }
    );
  }
}
