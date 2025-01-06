import { MongoClient } from "mongodb";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

const clientPromise = new MongoClient(process.env.MONGODB_URI!).connect();

const sendResetPasswordEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/new-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Reset password",
    html: `<p>Click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
  });
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ message: "Valid email is required" }),
        {
          status: 400,
        }
      );
    }

    const client = await clientPromise;
    const users = client.db().collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const token = randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000);

    await users.updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpiry: tokenExpiry } }
    );

    await sendResetPasswordEmail(email, token);

    return new Response(
      JSON.stringify({
        message: "Email sent, check your inbox",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing reset request:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
