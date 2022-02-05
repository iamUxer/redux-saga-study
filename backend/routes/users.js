const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.json(users);
    }
  } catch (error) {
    res.status(401).send({
      result: false,
      message: error.message,
    });
  }
});

router.post('/', async (req, res, next) => {
  const user = req.body;
  console.log('router post::::', req.body);
  try {
    const done = await User.create({
      name: user.name,
      email: user.email,
      introduce: user.introduce,
    });
    if (done) {
      const users = await User.findAll();
      res.json(users);
    }
  } catch (error) {
    res.status(401).send({
      result: false,
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const content = req.body;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (user) {
      let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
      let updatedAt = new Date(Date.now() - timezoneOffset);
      const done = await user.update({
        name: content.name,
        email: content.email,
        introduce: content.introduce,
        updatedAt: updatedAt,
      });
      if (done) {
        const users = await User.findAll();
        res.json(users);
      }
    }
  } catch (error) {
    res.status(401).send({
      result: false,
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const done = await User.destroy({
      where: { id: id },
    });
    if (done) {
      const users = await User.findAll();
      res.json(users);
    }
  } catch (error) {
    res.status(401).send({
      result: false,
      message: error.message,
    });
  }
});

module.exports = router;
