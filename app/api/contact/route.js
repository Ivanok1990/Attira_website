import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set. Please ensure it's configured in your .env.local file.");
} else {
  console.log("RESEND_API_KEY detected: " + process.env.RESEND_API_KEY.substring(0, 5) + "...");
}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Attira AI <contact@attiraai.com>',
      to: 'contact@attiraai.com',
      subject: `New contact from ${name}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      console.error('Error sending email from Resend:', error);
      return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully', data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
