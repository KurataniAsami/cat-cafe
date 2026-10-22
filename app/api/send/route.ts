import { EmailTemplate } from '@/app/components/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { username, email, subject, content } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['kr-scream.hurryx@ezweb.ne.jp'],  // resendに登録されているアドレスと合わせる
      subject: 'テスト主題',
      react: EmailTemplate({
        username,
        email,
        subject,
        content,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Resend error:", error);
    }

    return NextResponse.json(data);
  } catch (error) {
  console.error("API error:", error);

  return NextResponse.json(
    {
      error: error instanceof Error
        ? error.message
        : String(error),
    },
    { status: 500 }
  );
}}

// npm install @react-email/render