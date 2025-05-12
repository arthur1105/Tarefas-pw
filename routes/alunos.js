const express = require("express");
const router = express.Router();
const { Aluno, Curso } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os alunos
router.get("/",  async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      include: [{ model: Curso, as: "Curso" }],
    });
    res.render("base", {
      title: "Alunos", 
      view: "alunos/show",
      alunos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar alunos");
  }
});

// Formulário para adicionar um novo aluno
router.get("/add",  async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.render("base", {
      title: "Add Aluno",
      view: "alunos/add",
      cursos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar alunos");
  }
});

// Adicionar um novo aluno
router.post("/add",  async (req, res) => {
  try {
    const { nome, turma, cursoId } = req.body;
    await Aluno.create({
      nome,
      turma,
      cursoId,
    });
    res.redirect("/alunos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar Aluno");
  }
});

// Formulário para editar um aluno
router.get("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id, {
      include: [{ model: Curso, as: "Curso" }],
    });
    const cursos = await Curso.findAll();
    if (aluno) {
      res.render("base", {
        title: "Edit Aluno", 
        view: "alunos/edit",
        aluno,
        cursos,
      });
    } else {
      res.status(404).send("Aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar Aluno");
  }
});

// Atualizar um aluno
router.post("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, turma, cursoId } = req.body;
    const aluno = await Aluno.findByPk(id);
    if (aluno) {
      await aluno.update({ nome, turma, cursoId });
      res.redirect("/alunos");
    } else {
      res.status(404).send("Aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o Aluno");
  }
});

// Deletar um aluno
router.post("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (aluno) {
      await aluno.destroy();
      res.redirect("/alunos");
    } else {
      res.status(404).send("Aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir aluno");
  }
});

module.exports = router;
