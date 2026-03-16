const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateSignup = [
  body("username").isEmail().withMessage("O username deve ser um email válido."),
  body("password").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("As senhas não coincidem.");
    }
    return true;
  }),
];

exports.signupGet = (req, res) => res.render("sign-up-form", { errors: [] });

exports.signupPost = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up-form", { errors: errors.array() });
    }

    try {
      const { firstName, lastName, username, password } = req.body;

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        await db.createUser(firstName, lastName, username, hashedPassword);
        res.redirect("/");
      });
    } catch (error) {
      return next(error);
    }
  },
];

exports.loginGet = (req, res) => res.render("log-in-form");

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

exports.joinClubGet = (req, res) => {
  if (!req.user) return res.redirect("/auth/log-in");

  res.render("join-club", { errors: [] });
};

exports.joinClubPost = async (req, res, next) => {
  const { passcode } = req.body;

  const SECRET_PASSCODE = process.env.SECRET_PASSCODE;

  if (passcode === SECRET_PASSCODE) {
    try {
      await db.updateMembershipStatus(req.user.id);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  } else {
    res.render("join-club", {
      errors: [{ msg: "Senha secreta incorreta. Tente novamente!" }],
    });
  }
};

exports.adminGet = (req, res) => {
  if(!req.user) return res.redirect("/auth/log-in");

  res.render("admin-passcode", { errors: [] });
};

exports.adminPost = async (req, res, next) => {
  const { passcode } = req.body;

  const ADMIN_SECRET = process.env.ADMIN_PASSCODE;

  if (passcode === ADMIN_SECRET) {
    try {
      await db.updateAdminStatus(req.user.id);
      res.redirect("/");
    }
    catch (err) {
      return next(err);
    }
  }
  else {
    res.render("admin-passcode", {
      errors: [{ msg: "Código de administração incorreto!"}]
    });
  }
};

