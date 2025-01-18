import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/blogmodel";

connectToDatabase(); // Ensure the database is connected

export async function POST(req) {
  try {
    const data = await req.formData(); // Ensure it's properly awaited to access form data
    const files = data.getAll("images"); // Get all uploaded image files
    const userimagefiles = data.getAll("userImage"); 
    const blogDataString = data.get("blogData"); // Get the blogData string

    if (!blogDataString) {
      return NextResponse.json(
        { success: false, message: "Blog data is missing" },
        { status: 400 }
      );
    }

    const blogData = JSON.parse(blogDataString); // Parse the blog data JSON string

    // Destructure blog data
    const { blogTitle, blogType, name, email, country, phoneNumber, description, userImage } = blogData;

    // Validate required fields
    if (!blogTitle || !name || !email || !description) {
      return NextResponse.json(
        { success: false, message: "Blog title, name, email, and description are required" },
        { status: 400 }
      );
    }
// console.log(blogData)
// console.log(files)
// console.log(userimagefiles)
    const savedFiles = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Save image files to the public/uploads directory
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      savedFiles.push(`/uploads/${fileName}`); // Store relative path
    }


    // Handle userImage if provided and ensure it's a valid file
    let userImagePath = null;

    // Check if there is at least one user image file
    if (userimagefiles.length > 0) {
      const userImageFile = userimagefiles[0]; // Assuming the first file is the user image
      const arrayBuffer = await userImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${userImageFile.name}`;
      const filePath = path.join(uploadDir, fileName);
    
      await writeFile(filePath, buffer);
      userImagePath = `/uploads/${fileName}`; // Store relative path for the user image
    }
    
 
    // Save blog details to the database
    const newBlog = new Blog({
      blogTitle,
      blogType,
      author: { name, email, country, phoneNumber, userImage: userImagePath },
      description,
      images: savedFiles,
    });
    console.log(newBlog)

    await newBlog.save(); // Save the blog entry to the database
console.log("saved hoto")
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
