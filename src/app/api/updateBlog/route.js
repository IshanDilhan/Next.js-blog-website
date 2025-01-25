import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    // Parse FormData from the request
    const formData = await req.formData();

    // Parse and destructure fields
    const blogDataJson = formData.get("blogData");
    const blogData = JSON.parse(blogDataJson);

    const {
      blogTitle,
      blogType,
      name,
      email,
      country,
      phoneNumber,
      description,
      images: existingImages = [], // Existing image paths
    } = blogData;

    // Extract new image files from FormData
    const newImageFiles = formData.getAll("images").filter((file) => file instanceof File);

    const savedFilePaths = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Save new image files
    for (const file of newImageFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      savedFilePaths.push(`/uploads/${fileName}`); // Relative path for the saved file
    }

    // Combine existing image paths and new image paths
    const allImages = [...existingImages, ...savedFilePaths];

    // Construct updated blog data
    const updatedData = {
      blogTitle,
      blogType,
      author: {
        name,
        email,
        country,
        phoneNumber,
      },
      description,
      images: allImages,
    };

    // Update the blog in the database
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Return the updated blog
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
