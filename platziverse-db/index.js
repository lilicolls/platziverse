'use strict'
const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  // funciones de sequelize para definir la relacion de los modelos
  // automaticamente crea el id y la llave de relacion
  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  // validacion de la configuracion de la bdd
  // realiza un query sencillo a la bdd para validar que exista la conexion
  await sequelize.authenticate()

  if (config.setup) {
    // crear la bdd en el servidor
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent, // es lo mismo que colocar Agent: Agent
    Metric
  }
}
