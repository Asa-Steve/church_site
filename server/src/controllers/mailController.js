require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

const sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ status: "failure", message: "All fields are required!" });
  }

  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333333; }
                .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .header { background-color: #ff5197; color: #ffffff; padding: 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 20px; }
                .content { padding: 20px; }
                .content p { margin: 8px 0; }
                .footer { background-color: #001220; color: #ffffff; text-align: center; padding: 10px; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>${subject}</h1>
                </div>
                <div class="content">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="border-left: 4px solid #ff5197; padding-left: 10px; margin: 16px 0; color: #555555;">${message}</p>
                </div>
                <div class="footer">
                    <p>This email was automatically generated from the contact form on <a href="https://mount-zion.onrender.com" style="color: #ff5197; text-decoration: none;">Mount-zion</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `;

  const adminMail = "asadusteve456@gmail.com";
  try {
    const info = await transporter.sendMail({
      from: `New Contact Form Submission- <${adminMail}>`,
      to: adminMail,
      subject: `${subject}`,
      html: htmlContent,
      replyTo: email,
    });

    res
      .status(200)
      .json({ status: "success", message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "failure", message: "Email not sent" });
  }
};


module.exports = sendMail;
