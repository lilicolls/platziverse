'use strict'

const agent = {
    id:1,
    uuid: 'yyy-yyy-yyy',
    username: 'platzi',
    hostname: 'test-host',
    pid: 0,
    connected: true,
    createAt: new Date(),
    updatedAt: new Date(),
}

const agents = [
    agent,
    extend(agent, {id: 2, uuid: 'yyy-yyy-yyw', connected: false, username: 'test'}),
    extend(agent, {id: 3, uuid: 'yyy-yyy-yyx'}),
    extend(agent, {id: 4, uuid: 'yyy-yyy-yyz', username: 'test'}),
    {...agent, id:5, pid: 2} //usando spread operator
]

function extend(obj, values){
    //Object.assing (): copia los valores de las propiedades de un objeto origin a un objeto destino
    //Object.assing(objeto destino, objeto origen) => objeto destino
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
}

module.exports = {
    single: agent,
    all: agents,
    connected: agents.filter(a=> a.connected),
    platzi: agents.filter(a=> a.username === 'platzi'),
    byUuid: id => agents.filter(a=> a.uuid === id).shift(),
    byId: id => agents.filter(a=> a.id === id ).shift()

}