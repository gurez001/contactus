import { ContactForm } from "@/components/contact-form";
import { Card, CardHeader } from "@/components/ui/card";
export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card className="p-4 w-[350px]">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        </CardHeader>
        <ContactForm />
      </Card>
    </div>
  );
}
