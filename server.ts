import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import { z } from "zod";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: "Too many contact requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validação simples para o formulário
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Route para contato with rate limiting
  app.post("/api/contact", contactLimiter, async (req, res) => {
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
        from: "DevPremium Contact <contact@devpremium.com>", // Change to your verified domain
        to: recipientEmail,
        subject: `Novo Contato Portfólio: ${validatedData.name}`,
        html: `
          <h3>Novo contato recebido pelo seu portfólio!</h3>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>E-mail:</strong> ${validatedData.email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      console.log(`Email sent successfully: ${result.data?.id}`);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ 
          error: "Invalid data provided", 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        });
      }
      
      console.error("Email send failed:", error);
      res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
  });

  // Vite middleware para desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
