'use strict'

const test = require('ava')
let db = null

let config = {
  logging: function () {}
}

test.beforeEach(async () => {
  // ejecutar esta funcion antes de cada prueba
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exists') // en la prueba se valida que el metodo retorne un valor para el objeto agent
})
