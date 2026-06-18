import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(request) {
  try {
    const { name, age, thoughts } = await request.json();

    if (!name || !age || !thoughts) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const recipient = process.env.SUPPORT_EMAIL_RECIPIENT || 'test@example.com';

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating success response.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, message: 'Simulated success (Missing API Key)' }, { status: 200 });
    }

    const data = await resend.emails.send({
      from: 'India For Manipur <onboarding@resend.dev>',
      to: [recipient],
      subject: `New Solidarity Support from ${name}`,
      html: `
        <h2 style="color: #d4af37;">New Movement Support</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Thoughts on Manipur:</strong></p>
        <div style="padding: 12px; background: #f5f5f5; border-left: 4px solid #d4af37; white-space: pre-wrap;">
          ${thoughts}
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Resend API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
