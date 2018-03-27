'use strict'
// script de configuracion de la bdd
const debug = require('debug')('platziverse:db:setup') // se le indica en que fcn se hará el debug
const db = require('./')
const inquirer = require('inquirer')
const chalk = require ('chalk')

async function setup () {
  // obj de configuracion para la bdd de acuerdo a los requisitos de sequelize
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASSS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),     //para utilizar el modulo debug de npm
    setup: true,
    operatorsAliases: false
  }
  await db(config).catch(handleFatalError)
  console.log('succes')
  
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
