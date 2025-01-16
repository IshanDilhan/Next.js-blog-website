import { NextResponse } from "next/server";
const connectToDatabase = require("../../../../lib/mongoose");
import Blog from "../../../../models/blogmodel"; // Ensure the correct path to the model

connectToDatabase(); // Ensure the database is connected

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data)
    const { blogTitle, blogType, name, email, country, phoneNumber, description, images, userImage } = data;

    // Validate required fields
    if (!blogTitle || !name || !email || !description) {
      return NextResponse.json(
        { success: false, message: "Blog title, name, email, and description are required" },
        { status: 400 }
      );
    }

    // Create and save a new blog entry
    const newBlog = new Blog({
      blogTitle,
      blogType,
      author: { name, email, country, phoneNumber, userImage },
      description,
      images,
    });

    await newBlog.save(); // Save the blog entry to the database

    // Return a success response
    return NextResponse.json(
      { success: true, message: "Blog added successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while adding the blog", error: error.message },
      { status: 500 }
    );
  }
}
