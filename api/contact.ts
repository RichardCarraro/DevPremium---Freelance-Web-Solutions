import { Resend } from "resend";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiting alternative for serverless
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const contactLimiter = (req: VercelRequest) => {
  const ip = req.headers["x-forwarded-for"] as string || req.connection?.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const max = 5;

  const userData = rateLimitStore.get(ip);
  if (!userData || now > userData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false; // not limited
  }

  if (userData.count >= max) {
    return true; // limited
  }

  userData.count++;
  return false;
};

// Validação simples para o formulário
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  if (contactLimiter(req)) {
    return res.status(429).json({ error: "Too many contact requests. Please try again later." });
  }

  try {
    const validatedData = ContactSchema.parse(req.body);

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured." });
    }

    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error("CONTACT_EMAIL not configured");
      return res.status(500).json({ error: "Recipient email not configured." });
    }

    const result = await resend.emails.send({
      from: "DevPremium Contact <contact@dev.premium>",
      to: recipientEmail,
      subject: `Novo Contato Portfólio: ${validatedData.name}`,
      html: `
        <h3>Novo contato recebido pelo seu portfólio!</h3>
        <p><strong>Nome:</strong> ${validatedData.name}</p>
        <p><strong>E-mail:</strong> ${validatedData.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
      text: `NOVO CONTATO RECEBIDO PELO SEU PORTFÓLIO!

Nome: ${validatedData.name}

E-mail: ${validatedData.email}

Mensagem:
${validatedData.message}`,
    });

    console.log(`Email sent successfully: ${result.data?.id}`);
    res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return res.status(400).json({
        error: "Invalid data provided",
        details: error.errors.map(e => `${e.path.join(".")}: ${e.message}`)
      });
    }

    console.error("Email send failed:", error);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
}