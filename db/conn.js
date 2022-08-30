const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('tarefas', 'root', '', {
    host : "localhost",
    dialect: "mysql",
})

try{
    sequelize.authenticate()
    console.log("Conexão bem executada!")
} catch(err){
    console.log(`Não foi possível conectar no banco ${err}`)
}

module.exports = sequelize