const { Sequelize } = require('sequelize');
const meucrud = require('../mysql/db');

const User = meucrud.define('User', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    dataNascimento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


User.sync()
    .then(() => {
        console.log('User model synchronized with database');
    })
    .catch((error) => {
        console.error('Error synchronizing User model with database:', error);
    });


module.exports = User;
