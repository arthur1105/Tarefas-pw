const express = require("express");
const router = express.Router();
const { Professor } = require("../models");

// Listar professores
router.get("/", async (req, res) => {
    const professores = await Professor.findAll();
    res.render("base", {
        title: "professores",
        view: "professores/show",
        professores,
    });
});

// Formulário para adicionar professor
router.get("/add", (req, res) => {
    res.render("base", {
        title: "Add professor",
        view: "professores/add",
    });
});

// Adicionar nova professor
router.post("/add", async (req, res) => {
    await Professor.create({ nome: req.body.nome });
    res.redirect("/professores");
});

// Formulário para editar professor
router.get("/edit/:id", async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);

    res.render("base", {
        title: "Editar Professor",
        view: "professores/edit",
        professor,
    });
});


// Atualizar professor
router.post("/edit/:id", async (req, res) => {
    await Professor.update(
        { nome: req.body.nome },
        {where: { id: req.params.id },}
    );
    res.redirect("/professores");
});

// Deletar professor

router.post("/delete/:id", async (req, res) => {
    await Professor.destroy({ where: { id: req.params.id } });
    res.redirect("/professores");
});

module.exports = router;