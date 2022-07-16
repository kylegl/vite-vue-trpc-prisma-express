import nodemailer from 'nodemailer'

export async function sendLoginEmail({ email, url, token }: {
  email: string
  url: string
  token: string
}) {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <j.doe@example.com>',
    to: email,
    subject: 'Yooo! Welcome to the party',
    html: `Verify your email address by clicking <a href="${url}/login#token=${token}">here</a>`,
  })
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}