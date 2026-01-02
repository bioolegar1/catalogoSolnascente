// server/api/enviar-email.post.ts
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    // 1. Receber os dados do formulário
    const body = await readBody(event);
    const { nome, email, mensagem } = body;

    // Validação simples
    if (!nome || !email || !mensagem) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Campos obrigatórios faltando.',
        });
    }

    // 2. Configurar o Transporte (AQUI VOCÊ VAI ADICIONAR SEU EMAIL DEPOIS)
    // Exemplo usando Gmail (precisa de "Senha de App") ou seu servidor SMTP de hospedagem
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Ou smtp.seu-dominio.com.br
        port: 587,
        secure: false, // true para porta 465
        auth: {
            user: "seu-email@gmail.com", // <--- COLOQUE SEU EMAIL AQUI DEPOIS
            pass: "sua-senha-de-app",    // <--- COLOQUE SUA SENHA AQUI DEPOIS
        },
    });

    try {
        // 3. Enviar o E-mail
        await transporter.sendMail({
            from: `"Formulário Site" <${email}>`, // Quem enviou (vem do form) ou seu próprio email
            to: "destino@seu-email.com", // <--- PARA ONDE VAI O EMAIL (VOCÊ)
            subject: `Novo contato de: ${nome}`,
            text: `
        Nome: ${nome}
        Email: ${email}
        Mensagem:
        ${mensagem}
      `,
            html: `
        <h3>Novo contato pelo site</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong><br/>${mensagem}</p>
      `,
        });

        return { success: true, message: 'Email enviado com sucesso!' };
    } catch (error: any) {
        console.error('Erro ao enviar email:', error);
        // IMPORTANTE: Enquanto você não configurar o SMTP acima, vai dar erro aqui.
        // Retornamos um erro amigável.
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao conectar no servidor de email (SMTP não configurado).',
        });
    }
});