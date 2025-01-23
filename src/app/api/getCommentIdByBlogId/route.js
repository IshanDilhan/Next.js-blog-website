import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Comment from "../../../../models/comment"; // Assuming this is your Comment model

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

    // Fetch comments for the specified blogId
    const comments = await Comment.find({ blogId });

    // Handle case where no comments are found
    if (comments.length === 0) {
      return NextResponse.json(
        { success: false, message: "No comments found for this blog" },
        { status: 404 }
      );
    }

    // Return the comments
    return NextResponse.json(
      { success: true, comments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments by blogId:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching comments", error: error.message },
      { status: 500 }
    );
  }
}
