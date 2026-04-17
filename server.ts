import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Validação simples para o formulário
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route para contato
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = ContactSchema.parse(req.body);
      
      if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ error: "Configuração de e-mail ausente (API Key)." });
      }

      await resend.emails.send({
        from: "DevPro Contact <onboarding@resend.dev>",
        to: "richardcarraro0@gmail.com",
        subject: `Novo Contato Portfólio: ${validatedData.name}`,
        html: `
          <h3>Novo contato recebido pelo seu portfólio!</h3>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>E-mail:</strong> ${validatedData.email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(400).json({ error: "Dados inválidos ou falha no servidor." });
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
