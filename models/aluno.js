module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define("Aluno", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      turma: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Aluno.associate = (models) => {
      Aluno.belongsTo(models.Curso, {
        foreignKey: "cursoId",
        as: "Curso", 
      });
    };
  
    return Aluno;
  };
  