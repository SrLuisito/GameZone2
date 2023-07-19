const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require("sequelize");
//Models

const userController = {
  index: (req, res) => {
    res.render("users/user", {
      user: req.session.userLogged,
    });
  },
  create: (req, res) => {
    res.render("users/formularioCrearUsuario");
  },
  createPost: (req, res) => {
    //info
    let errorsValidator = validationResult(req);
    let oldData = req.body;
    if (errorsValidator.errors.length > 0) {
      res.render("users/formularioCrearUsuario", {
        errors: errorsValidator.mapped(),
        oldData: oldData,
      });
      console.log(errorsValidator.mapped());
    } else {
      const imgFileName = req.file ? req.file.filename : '1689545541659_img_.png';
      db.Usuario.create({
        username: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        img: imgFileName
      })
        .then((user) => {
          res.redirect("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  login: (req, res) => {
    res.render("login");
  },
  loginProcess: async (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
      res.render("login", {
        errors: results.mapped(),
      });
    } else {
      try {
        let userToLog = await db.Usuario.findOne({
          where: { email: req.body.email },
        });

        if (userToLog) {
          let samePassword = await bcrypt.compare(
            req.body.password,
            userToLog.password
          );

          if (samePassword) {
            req.session.userLogged = userToLog;

            if (req.body.recordarme) {
              res.cookie("userEmail", req.body.email, { maxAge: 1000 * 120 });
            }

            res.redirect("/user");
          } else {
            res.render("login", {
              errors: {
                password: {
                  msg: "Contraseña incorrecta",
                },
              },
            });
          }
        } else {
          res.render("login", {
            errors: {
              email: {
                msg: "No se encuentra el email",
              },
            },
          });
        }
      } catch (error) {
        // Manejar cualquier error de la base de datos
        console.error(error);
        res.render("login", {
          errors: {
            email: {
              msg: "Ocurrió un error al intentar iniciar sesión",
            },
          },
        });
      }
    }
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = userController;
