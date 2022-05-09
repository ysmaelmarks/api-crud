'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
          foreignKey: 'docent_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
    }
  }
  Pessoas.init({
    nome: {
      type:DataTypes.STRING,
      validate:{
        validarFuncao: function(dado){
          if (dado.length < 3) throw new Error('o campo de nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {type: DataTypes.STRING, validate: {
      isEmail: {
          args: true, 
          msg: 'dados do tipo email inválidos'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    //permite o softdelete
    paranoid: true,
    //retorna apenas as pessoas com matricula ATIVA
    defaultScope: {
      where:  {ativo: true}
    },
    scopes: {
      todos: {
        where: {}
      }
    },
  });
  return Pessoas;
};