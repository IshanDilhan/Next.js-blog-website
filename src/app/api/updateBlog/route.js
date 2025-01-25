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
    } = blogData;

    // Extract all images from formData
    const allImages = formData.getAll("images"); // Contains both files and strings
    const newImageFiles = allImages.filter((file) => file instanceof File); // Newly added files
    const existingImagePaths = allImages.filter((item) => typeof item === "string"); // Existing paths

    console.log("All images from formData:", allImages);
    console.log("New image files:", newImageFiles);
    console.log("Existing image paths:", existingImagePaths);

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

    // Combine existing image paths and newly saved paths
    const allCombinedImages = [...existingImagePaths, ...savedFilePaths];

    console.log("Final combined images:", allCombinedImages);
   //user image 

   // Extract user image from blogData
const { userImage: existingUserImage = null } = blogData;

// Get the new user image file from FormData
const userImageFile = formData.get("userImage");
console.log(userImageFile)
// Check if userImageFile is a new file or an existing path
let userImagePath = existingUserImage; // Default to the existing path

if (userImageFile instanceof File) {
  // Handle new user image upload
  const arrayBuffer = await userImageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}-${userImageFile.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);
  userImagePath = `/uploads/${fileName}`; // Update with the new path
}

// Log the result
console.log("Final user image path:", userImagePath);

    // Construct updated blog data
    const updatedData = {
      blogTitle,
      blogType,
      author: {
        name,
        email,
        country,
        phoneNumber,
        userImage: userImagePath
      },
      description,
      images: allCombinedImages,
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
