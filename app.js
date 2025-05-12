const express = require("express");
const path = require("path");

const PORT = 3000;

const app = express();

const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS como view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Rota principal
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Rotas para categorias e produtos
const categoriaRouter = require("./routes/categorias");
const produtoRouter = require("./routes/produtos");
const alunoRouter = require("./routes/alunos");
const cursoRouter = require("./routes/cursos");
const professoreRouter = require("./routes/professores");

app.use("/categorias", categoriaRouter);
app.use("/produtos", produtoRouter);
app.use("/alunos", alunoRouter);
app.use("/cursos", cursoRouter);
app.use("/professores", professoreRouter);

// Iniciar o servidor e sincronizar com o banco de dados
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor em execução na porta: http://localhost:${PORT}`);
  });
});
