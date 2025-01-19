import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function DELETE(req) {
  try {
    // Get blog ID from URL (assuming the ID is passed in the URL)
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");
    

    // Find and delete the blog with the provided ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // If no blog is found with the provided ID
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while deleting the blog", error: error.message },
      { status: 500 }
    );
  }
}
