import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message, to } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Log the request for debugging
    console.log('Received contact form submission:', { name, email, subject });

    // Configure email transport (add your email settings)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to,
      subject: `Contact Form: ${subject}`,
      text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;