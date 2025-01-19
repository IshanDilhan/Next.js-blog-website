import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");
    console.log("Blog ID:", blogId);

    // Parse FormData from the request
    const formData = await req.formData();

    // Extract fields from the formData
    //console.log(formData)
    const blogDataJson = formData.get("blogData");
    const blogData = JSON.parse(blogDataJson);  // Ensure we parse the JSON string here

    // Destructure fields from blogData
    const {
      blogTitle,
      blogType,
      name,
      email,
      country,
      phoneNumber,
      description,
      userImage,
    } = blogData;

    // Handle user image file
    const userImageFile = formData.get("userImage");
    const userImagePath = userImageFile ? `/uploads/${userImageFile.name}` : null;

    // Handle multiple images
    const imageFiles = formData.getAll("images");
    const savedFiles = imageFiles.map((file) => `/uploads/${file.name}`);

    // Construct the updated data object
    const updatedData = {
      blogTitle,
      blogType,
      author: {
        name,
        email,
        country,
        phoneNumber,
        userImage: userImagePath,
      },
      description,
      images: savedFiles,
    };

    console.log("Updated Data:", updatedData);

    // Find the blog and update it with the new data
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

    console.log("Updated Blog:", updatedBlog);

    // If no blog is found with the provided ID
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Return success response with updated blog data
    return NextResponse.json(
      { success: true, message: "Blog updated successfully", updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the blog", error: error.message },
      { status: 500 }
    );
  }
}
