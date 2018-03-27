'use strict'
// script de configuracion de la bdd
const debug = require('debug')('platziverse:db:setup') // se le indica en que fcn se hará el debug
const db = require('./')
const inquirer = require('inquirer')
const chalk = require ('chalk')

const prompt = inquirer.createPromptModule()  //devuelve una promesa que se cumple cuando el usuario responda el prompt
async function setup () {

  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup){  
    //Si el usuario responde no, se hace un early return, de lo contrario se continua con el resto del script de setup
    return console.log("nothin happened :)")
  }
  
  // obj de configuracion para la bdd de acuerdo a los requisitos de sequelize
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),     //para utilizar el modulo debug de npm
    setup: true,
    operatorsAliases: false
  }
  console.log('el usuario puso ' + config.password)


  await db(config).catch(handleFatalError)
  console.log('succes')
  
  process.exit(0)
}

function handleFatalError (err) {
  console.error( `${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
