import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const enviarCorreo = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: `"Taytaldo Web" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Correo enviado:', info.messageId)
  } catch (error) {
    console.error('Error al enviar correo:', error)
    throw error
  }
}

