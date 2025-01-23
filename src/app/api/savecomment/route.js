import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Comment from "../../../../models/comment";

connectToDatabase();

export async function POST(req) {
  try {
    // Parse the FormData object
    const data = await req.formData();

    // Extract the values
    const username = data.get("username");
    const text = data.get("text");
    const blogId = data.get("blogId"); // blogId will remain as a string

    // Validate required fields
    if (!username || !text || !blogId) {
      return NextResponse.json(
        {
          success: false,
          message: "Username, text, and blogId are required.",
        },
        { status: 400 }
      );
    }

    // Save the comment to the database
    const comment = new Comment({ username, text, blogId });
    await comment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Comment saved successfully.",
        data: comment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while saving the comment.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
