import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId, generarJWT } from "../helpers/tokens.js";
import { emailOlvidePassword, emailRegistro } from "../helpers/emails.js";
import bcrypt from "bcrypt";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
    csrfToken: req.csrfToken(),
  });
};

const auntenticar = async (req, res) => {
  // Validacion
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  await check("password")
    .notEmpty()
    .withMessage("El Password es Obligatorio")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //comprobar si el usuario exite
  const { email, password, id } = req.body;
  //Verificar que el usuario no este duplicado
  const exiteUsuario = await Usuario.findOne({
    where: { email },
  });

  if (!exiteUsuario) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario no Exite" }],
    });
  }
  if (!exiteUsuario.confirm) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Tu cuenta no ha sido Confirmada" }],
    });
  }

  //validar Password
  const validPassword = bcrypt.compareSync(password, exiteUsuario.password);

  if (!validPassword) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El password es invalido" }],
    });
  }
  const token = generarJWT(exiteUsuario.id);

  //craer una cookie

  return res
    .cookie("_token", token, {
      httpOnly: true,
      //  expires: 900,
      //secure:true
    })
    .redirect("/mis-propiedades");
};

const formularioRes = (req, res) => {
  res.render("auth/registrar", {
    pagina: "Crear cuenta",
    csrfToken: req.csrfToken(),
  });
};

const resgistrar = async (req, res) => {
  //validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El Nombre no puede ir vacio")
    .run(req);

  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("min 6 caracteres")
    .run(req);

  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("los password no son iguales")
    .run(req);

  let resultado = validationResult(req);

  //return res.json(resultado.array());

  //Verficar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registrar", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //Extraer los datos
  const { nombre, email, password } = req.body;

  //Verificar que el usuario no este diplicado
  const exiteUsurio = await Usuario.findOne({
    where: { email },
  });

  if (exiteUsurio) {
    return res.render("auth/registrar", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario ya exite" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Crear un nuevo usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  //enviar el correo de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confimacion
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos Enviado un EMAIL de confirmacion, presiona el enlace",
  });

  //res.json(usuario);
};

//Funcion que compureba una cuenta
const confirmar = async (req, res) => {
  const { token } = req.params;
  // console.log(token);
  //verificar si el token es valido

  const usuario = await Usuario.findOne({
    where: { token },
  });
  if (!usuario) {
    return res.render("auth/confirma-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Error al confirmar tu cuenta, Intenta de nuevo",
      error: true,
    });
  }
  //Confirmar la cuenta
  usuario.token = null;
  usuario.confirm = true;

  await usuario.save();
  res.render("auth/confirma-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "la cuenta se confirmo correctamente",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  let resultado = validationResult(req);

  //Verficar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  const { email } = req.body;
  const usuario = await Usuario.findOne({
    where: { email },
  });

  if (!usuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Email no pertenece a ninguna cuenta" }],
    });
  }

  //Generar un token
  usuario.token = generarId();
  await usuario.save();
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Restablecer tu password",
    mensaje: "Hemos enviado un email con las instrucciones",
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  //verificar si el token es valido
  const usuario = await Usuario.findOne({
    where: { token },
  });
  if (!usuario) {
    return res.render("auth/confirma-cuenta", {
      pagina: "Restablecer tu password",
      mensaje: "Hubo un error, Intenta de nuevo",
      error: true,
    });
  }

  //Mostrar Formulario
  res.render("auth/reset-password", {
    pagina: "Restablecer tu password",
    csrfToken: req.csrfToken(),
  });
};

const nuevoPassword = async (req, res) => {
  await check("password")
    .isLength({ min: 6 })
    .withMessage("min 6 caracteres")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/reset-password", {
      pagina: "password",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }
  //Confirmar la cuenta

  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({
    where: { token },
  });

  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  //Guarda informacion en la base datos
  await usuario.save();
  res.render("auth/confirma-cuenta", {
    pagina: "Password Reestablecido",
    mensaje: "Su cuenta se Reestablecio con exito",
  });
};

export {
  auntenticar,
  confirmar,
  formularioLogin,
  formularioOlvidePassword,
  formularioRes,
  resgistrar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
