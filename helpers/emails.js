import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //console.log(datos);
  const { email, nombre, token } = datos;

  //Enviar el email
  await transport.sendMail({
    from: "bienesRaices.com",
    to: email,
    subject: "confirma tu cuenta en BienesRaices",
    text: "confirma tu cuenta en BienesRaices",

    html: ` <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com<p/>
    <p>Tu cuenta ya esta lista, solo debes confirmarla en el sisguente enlace:
    <br> 
    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/auth/confirmar/${token}">Confirmar</a>
    </p >
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p> `,
  });
};

const emailOlvidePassword = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //console.log(datos);
  const { email, nombre, token } = datos;

  //Enviar el email
  await transport.sendMail({
    from: "bienesRaices.com",
    to: email,
    subject: "Restablece tu cuenta en BienesRaices",
    text: "Restablece tu password en BienesRaices",

    html: ` <p>Hola ${nombre}, has solicitado reestablecer tu password en bienesRaices.com<p/>
    <p>:
     
    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/auth/olvide-password/${token}">Reestablecer Password</a>
    </p >
    <p>Si no deseas generar un nuevo password, puedes ignorar el mensaje</p> `,
  });
};

export { emailRegistro, emailOlvidePassword };
