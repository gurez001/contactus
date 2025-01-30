import { type NextRequest, NextResponse } from "next/server"
import { ContactController } from "../controllers/contactController"

export async function GET() {
  return NextResponse.json({ message: "Send a POST request to submit the contact form" })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await ContactController.submitForm(body)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 },
    )
  }
}

