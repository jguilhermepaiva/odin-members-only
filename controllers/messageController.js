const db = require("../db/queries");
const pool = require("../db/pool"); 

exports.createMessageGet = (req, res) => {
  if (!req.user) return res.redirect("/auth/log-in");
  res.render("new-message-form", { title: "Nova Mensagem" });
};

exports.createMessagePost = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    await db.createMessage(title, text, req.user.id);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessagePost = async (req, res, next) => {
  const { messageId } = req.body;

  try {
    const { rows } = await pool.query("SELECT user_id FROM messages WHERE id = $1", [messageId]);
    const message = rows[0];

    if (!message) {
      return res.status(404).send("Mensagem não encontrada");
    }

    const isOwner = req.user.id === message.user_id;
    const isAdmin = req.user.is_admin;

    if (isAdmin || isOwner) {
      await db.deleteMessage(messageId);
      res.redirect("/");
    } else {
      res.status(403).send("Acesso negado: Você não tem permissão para apagar esta mensagem.");
      res.redirect("/");
    }
  } catch (err) {
    return next(err);
  }
};
