export const methods = ['POST'];

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';
import { emailSignature } from '@/config/emailSignature';

const rateLimiter = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const xForwardedFor = request.headers.get('x-forwarded-for');
  const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : 'unknown';
  const requests = rateLimiter.get(ip) || 0;

  if (requests >= 5) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  rateLimiter.set(ip, requests + 1);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'contact@stivluc.com',
      subject: `Message from ${name}`,
      text: `${message}\n\nFrom: ${email}`,
      html: `<p>${message}</p><p>From: ${email}</p>`,
      replyTo: email,
    });

    await transporter.sendMail({
      from: `"Steven Lucas" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your message has been received',
      text: `Hello ${name},\n\nThank you for reaching out! I have received your message and will respond as soon as possible.\n\nBest regards,\nSteven Lucas`,
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for reaching out! I have received your message and will respond as soon as possible.</p>
        ${emailSignature}
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: `Failed to send message: ${error}` }, { status: 500 });
  }
}
