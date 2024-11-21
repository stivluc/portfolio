import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';
import { LRUCache } from 'lru-cache';
import { emailSignature } from '@/config/emailSignature';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const rateLimiter = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let formData;
  try {
    formData = await request.json();
  } catch (error) {
    console.error('Error parsing request JSON:', error);
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }

  const { name, email, message } = formData;

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

  const mailjetClient = mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  const messages = [
    {
      From: {
        Email: process.env.EMAIL_FROM,
        Name: 'Steven Lucas',
      },
      To: [
        {
          Email: 'contact@stivluc.com',
          Name: 'Steven Lucas',
        },
      ],
      Subject: `Message from ${name}`,
      TextPart: `${message}\n\nFrom: ${email}`,
      HTMLPart: `<p>${message}</p><p>From: ${email}</p>`,
      ReplyTo: {
        Email: email,
        Name: name,
      },
    },
    {
      From: {
        Email: process.env.EMAIL_FROM,
        Name: 'Steven Lucas',
      },
      To: [
        {
          Email: email,
          Name: name,
        },
      ],
      Subject: 'Your message has been received',
      TextPart: `Hello ${name},\n\nThank you for reaching out! I have received your message and will respond as soon as possible.\n\nBest regards,\nSteven Lucas`,
      HTMLPart: `
        <p>Hello ${name},</p>
        <p>Thank you for reaching out! I have received your message and will respond as soon as possible.</p>
        ${emailSignature}
      `,
    },
  ];

  try {
    const request = mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: messages,
    });

    const result = await request;
    if (result.body.Messages[0].Status === 'success') {
      return NextResponse.json({ message: 'Message sent successfully.' }, { status: 201 });
    } else {
      console.error('Mailjet error:', result.body);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
