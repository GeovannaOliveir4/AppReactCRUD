const express = require("express");
const User = require('../models/user')

const router = express.Router();

// Rota para obter todos os usuários
router.get('/users', (req , res) => {
  User.findAll()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// Rota para criar um novo usuário
router.post('/users', (req, res) => {
  const { nome, telefone, email, dataNascimento } = req.body;

  User.create({ nome, telefone, email, dataNascimento })
    .then((user) => {
      return res.status(201).json({ message: 'Usuário cadastrado', user });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// Rota para atualizar um usuário existente
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, dataNascimento } = req.body;

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return user.update({ nome, telefone, email, dataNascimento });
    })
    .then((user) => {
      return res.status(200).json({ message: 'Usuário atualizado', user });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// Rota para excluir um usuário
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id } })
    .then((affectedRows) => {
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.status(200).json({ message: 'Usuário excluído' });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

module.exports = router;
