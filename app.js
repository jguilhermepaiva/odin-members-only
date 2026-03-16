const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const app = express();
const db = require("./db/queries");

// 1. Configurações de View (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 2. Middlewares de Parser e Estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 3. Configuração de Sessão (OBRIGATÓRIO antes do Passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'cats',
    resave: false,
    saveUninitialized: false,
}));

// 4. Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// 5. Middleware de Variáveis Globais
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null; 
    next();
});

// 6. Rotas (Sempre depois de configurar Passport/Session)
const authRouter = require('./routes/authRouter');
const messageRouter = require("./routes/messageRouter"); // Importado aqui

app.use("/auth", authRouter);
app.use("/messages", messageRouter); // Movido para baixo!

app.get("/", async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render("index", {
            title: "Clubhouse",
            messages: messages
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao carregar mensagens");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Clubhouse rodando na porta ${PORT}`);
});

module.exports = app;