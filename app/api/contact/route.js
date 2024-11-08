import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

const rateLimiter = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signature = `
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
  </head>
  <body dir="auto">
    <div dir="ltr">
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 0px 1px 25px 0px; font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap;">
              <p style="line-height: 17px; font-weight: 700; color: rgb(0, 0, 0); margin: 1px;">Steven Lucas</p>
              <p style="line-height: 17px; color: rgb(136, 136, 136); margin: 1px;">Full Stack Engineer</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0px 1px 0px 0px;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="padding: 25px 1px 25px 0px; border-top-width: 2px; border-top-style: solid; border-top-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; border-bottom-color: rgb(0, 0, 0);">
                      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                        <tbody>
                          <tr>
                            <td valign="middle" style="padding: 0px 30px 0px 0px;">
                              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                                <tbody>
                                  <tr>
                                    <td style="padding: 0px 1px 0px 0px;">
                                      <p style="margin: 1px;">
                                        <a href="https://stivluc.com/" target="_blank" style="text-decoration: none !important;">
                                          <img src="https://i.ibb.co/HpcHf4D/logo-NOIR.png" alt="Logo" title="Logo" width="107" height="68" style="display: block; border: 0px;">
                                        </a>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="10" style="padding: 0px 1px 0px 0px;"></td>
                            <td style="padding: 0px 1px 0px 0px;">
                              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                                <tbody>
                                  <tr>
                                    <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                                      <p style="margin: 1px;">
                                        <img src="https://i.ibb.co/XxM08Vr/email.png" alt="Email" width="18" height="18" style="display: block; border: 0px;">
                                      </p>
                                    </td>
                                    <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; padding: 1px 0px; vertical-align: middle; color: rgb(136, 136, 135) !important;">
                                      <p style="margin: 1px;">
                                        <a href="mailto:contact@stivluc.com" target="_blank" style="line-height: 17px; color: rgb(136, 136, 136); text-decoration: none !important;">contact@stivluc.com</a>
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                                      <p style="margin: 1px;">
                                        <img src="https://i.ibb.co/vj8qJpX/phone-call.png" alt="Phone" width="18" height="18" style="display: block; border: 0px;">
                                      </p>
                                    </td>
                                    <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; padding: 1px 0px; vertical-align: middle; color: rgb(136, 136, 135) !important;">
                                      <p style="margin: 1px;">
                                        <a href="tel:+33688074187" target="_blank" style="line-height: 17px; color: rgb(136, 136, 136); text-decoration: none !important;">+33 6 88 07 41 87</a>
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; font-weight: 700; padding: 15px 3px 0px 0px; color: rgb(0, 0, 1) !important;">
                                      <p style="margin: 1px;">
                                        <a href="https://stivluc.com/" target="_blank" style="line-height: 17px; color: rgb(0, 0, 0); text-decoration: none !important;">stivluc.com</a>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="15" style="padding: 0px 1px 0px 0px;"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

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
        ${signature}
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
