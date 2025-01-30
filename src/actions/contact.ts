"use server";

import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function submitContactForm(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const response = await fetch(`http://localhost:3000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If your API requires authentication, add the necessary headers here
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const responseData = await response.json();

    return {
      success: true,
      message:
        responseData.message ||
        "Thank you for your message. We'll be in touch soon!",
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message:
        "An error occurred while submitting the form. Please try again later.",
    };
  }
}
