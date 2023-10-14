import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    host: "mail.virtualeternity.cl",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  if (req.method === 'POST') {
    const email = req.body.to;

    const mailOptions = {
      from: '"Virtual Eternity" <noreply@virtualeternity.cl>',
      to: email,
      subject: `${req.body.name} te ha enviado ${req.body.subject}`,

      text: req.body.text,
        fileLink: req.body.downloadUrl,
      html: `
<img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Fabove%20text%20copy.png?alt=media&token=97b8d649-d7b5-4a0d-9b69-78c283d5537f" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; width: 800px;">

       <div style="background-color: #f7f7f7; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #444444;">
             ${req.body.name} te ha enviado un documento privado ${req.body.subject} <br>  <a href="${req.body.downloadUrl}">Habre documento</a>

        </div>
    <img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Funder%20text.png?alt=media&token=fcb5e9a7-1423-40c9-81c0-e7acf5e24316" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; height: 500px;">
</div>


      `
    };


    console.log("Documento Link: ", req.body.fileLink);
    console.log("Email: ", email);
    // Sending the email
    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error sending email.' });
    }

  } else {
    return res.status(405).json({ error: 'Only POST requests are allowed.' });
  }
}
