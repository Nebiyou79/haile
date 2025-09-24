import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, comments } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: email,
        to: process.env.RECEIVING_EMAIL,
        subject: 'New Appointment Request',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
      });

      res.status(200).json({ message: 'Appointment request sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send appointment request.', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
