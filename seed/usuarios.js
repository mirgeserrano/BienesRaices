import bcrypt from "bcrypt";
const usuarios = [
  {
    nombre: "mirge",
    email: "mirgeserrano@gmail.com",
    confirm: 1,
    password: bcrypt.hashSync("password", 10),
  },
];

export default usuarios;
