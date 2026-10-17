type EmailTemplateProps = {
  username: string | undefined
  email: string | undefined
  subject: string | undefined
  content: string | undefined
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    username,
    email,
    subject,
    content
  }) => {
    return (
      <div>
      <h1>こんにちは、{username}です。</h1>
      <p>{email}から届きました</p>
      <p>{subject}</p>
      <p>{content}</p>
    </div>
    )
    
}