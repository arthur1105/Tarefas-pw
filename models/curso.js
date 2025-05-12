module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define("Curso", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Curso.associate = (models) => {
    Curso.hasMany(models.Aluno, {
      foreignKey: "cursoId",
      as: "alunos",
    });
  };
  return Curso;
};
