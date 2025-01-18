import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function GET(req) {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find(); 

    // If no blogs are found
    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        { success: false, message: "No blogs found" },
        { status: 404 }
      );
    }

    // Return the fetched blogs
    return NextResponse.json(
      { success: true, blogs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching blogs", error: error.message },
      { status: 500 }
    );
  }
}
