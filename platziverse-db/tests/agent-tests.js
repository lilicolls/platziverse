'use strict'

const test = require('ava')
const proxyquire = require ('proxyquire')
const sinon = require ('sinon')
let db = null
let AgentStub = null
let sandbox = null

let config = {
  logging: function () {}
}

let MetricStub = {
  //objeto stub para emular el obj de metrica
  belongsTo: sinon.spy()
}

test.beforeEach(async () => {
  // ejecutar esta funcion antes de cada prueba
  sandbox = sinon.sandbox.create()
  AgentStub = {     //renuevo el valor del stub cada vez que se haga el llamado
                    //esto se hace para tener un stub fresco cada vez que se haga un llamado al modelo de agente
    hasMany: sandbox.spy()
  }
  //const setupDatabase = require('../')
  const setupDatabase = proxyquire ('../', {
    './models/agent': ()=> AgentStub,
    './models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(()=>{
  sandbox && sinon.sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exists') // en la prueba se valida que el metodo retorne un valor para el objeto agent

})

test.serial('Setup', t=>{ //evitar que los test se corran de manera paralela para evitar incongruencias en caso de que
  // se corran distintos test al mismo tiempo que modifiquen los datos
  t.true( AgentStub.hasMany.called, 'AgentStub.hasMany was called')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Agent was called with MetricStub')
  t.true(MetricStub.belongsTo.called,'MetricStub.belongsTo was excecuted')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Metric was called with AgentStub')
})   