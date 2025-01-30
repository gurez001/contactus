import Contact, { IContact } from "@/models/Contact";
import { contactus } from "@/services/mailer";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export class ContactController {
  static async submitForm(body: any) {
    // Validate the input
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    try {
      // Connect to the database
      await dbConnect();

      // Create the contact document
      const contactData: Partial<IContact> = {
        ...result.data,
        createdAt: new Date(),
        envelopeTime: 0, // You might want to set this to a meaningful value
      };

      // Send email
      const emailResult: any = await contactus(result.data);
      console.log("Email sent:", emailResult);
      const updateddata: any = {
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        createdAt: Date,
        accepted: emailResult?.accepted,
        ehlo: emailResult?.ehlo,
        response: emailResult?.response,
        rejected: emailResult?.rejected,
        envelopeTime: emailResult?.envelopeTime,
        messageTime: emailResult?.messageTime,
        messageSize: emailResult?.messageSize,
        messageId: emailResult?.messageId,
      };
      const newContact = await Contact.create(updateddata);
      console.log("New contact created:", newContact);

      //   // Update the contact document with email sending results
      //   if (emailResult && emailResult.messageId) {
      //     await Contact.findByIdAndUpdate(newContact._id, {
      //       messageId: emailResult.messageId,
      //       messageTime: emailResult.messageTime,
      //       messageSize: emailResult.messageSize,
      //       accepted: emailResult.accepted,
      //       rejected: emailResult.rejected,
      //     });
      //   }

      return {
        success: true,
        message: "Thank you for your message. We'll be in touch soon!",
      };
    } catch (error) {
      console.error("Error processing form submission:", error);
      return {
        success: false,
        message:
          "An error occurred while processing your submission. Please try again later.",
      };
    }
  }
}
