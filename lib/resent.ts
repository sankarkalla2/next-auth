import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVefication = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verificationToken?token=${token}`;

  console.log(email, token);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmationLink}">Click</a></p>`,
  });
};
