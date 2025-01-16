const { NextResponse } = require("next/server");
const connectToDatabase = require("../../../../lib/mongoose");
const User = require("../../../../models/usermodel");

// Connect to the database
connectToDatabase();

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { email, phoneNumber } = await req.json();
 console.log(req)
    // Validate required fields
    if (!email || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Email and phone number are required" },
        { status: 400 }
      );
    }

    // Check if a user exists with the provided email and phone number
    const user = await User.findOne({ email, phoneNumber });

    if (!user) {
      
      return NextResponse.json(
        { success: false, message: "User not found or invalid details" },
        { status: 404 }
      );
    }

    // Example success response
    return NextResponse.json(
      { success: true, message: "User verified successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
