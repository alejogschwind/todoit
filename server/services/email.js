import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const getTransporter = () => {
  // TODO: config transporter.
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendVerificationEmail = async (token, firstName, lastName, email) => {
  const transporter = getTransporter();

  transporter.sendMail(
    {
      from: `TODOIT APP 🤖 <${process.env.EMAIL}>`,
      to: email,
      subject: `TODOIT - Verificacion de Email ✔`,
      html: `
        Hola ${firstName} ${lastName}! Su registro fue realizado satisfactoriamente.<br/>
        Para verficar que sea tu cuenta de correo has click en el corazón:
        <a href="${process.env.CLIENT_URL}/verify-email/${token}">❤️<a>
        <br/>
        <br/>
        En caso que no sea usted quien completo el registro, ignore este email.
        <br/>
        Saludos cordiales,<br />
        TODOIT.
      `,
    },
    (err, info) => {}
  );
};

export const sendPasswordResetEmail = (
  token,
  { firstName, lastName, email }
) => {
  const transporter = getTransporter();

  transporter.sendMail(
    {
      from: `TODOIT APP 🤖 <${process.env.EMAIL}>`,
      to: email,
      subject: `TODOIT - Restablecer contraseña.`,
      html: `
        Hola ${firstName} ${lastName}! Se solicito un restablecimento de contraseña.<br/>
        Si no lo solicito usted, ignore este mail. En caso contrario entre <br/>
        al siguiente link.<br/>

        Recuerde que en 30 minutos este link sera invalido y debera recuperar la <br/>
        contraseña nuevamente: 
        <a href="${process.env.CLIENT_URL}/reset-password/${token}">Resetear contraseña<a>
      
        <br/><br/>
        Saludos cordiales,<br />
        TODOIT.
      `,
    },
    (err, info) => {}
  );
};

export const signVerificationEmail = ({ id, firstName, lastName, email }) => {
  jwt.sign(
    {
      id,
    },
    process.env.JWT_EMAIL_SECRET,
    { expiresIn: "1d" },
    (err, token) => {
      sendVerificationEmail(token, firstName, lastName, email);
    }
  );
};
