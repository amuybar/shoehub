import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const body = await req.json();

    // Log the body or handle it as needed
    console.log(body);

    // Save the message to your database or file system
    // TODO: Implement your database saving logic here

    // Return a success response
    return NextResponse.json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Error handling POST request:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
