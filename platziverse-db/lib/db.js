'use stric'

// funcion de  conexion a bdd, cada vez que se llame se regresa la misma instancia
// al ser u singleton se limita a tener una sola instancia por objeto

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
