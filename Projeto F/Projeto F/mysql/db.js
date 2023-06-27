const { Sequelize } = require("sequelize")

const meucrud = new Sequelize('crud','root','admin',{
    host:'localhost',
    dialect:'mysql',
    logging: false
})

module.exports = meucrud;