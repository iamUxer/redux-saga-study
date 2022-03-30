const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
  //bcrypt 적용
  const user = req.body.user;
  const encryptedPassword = await bcrypt.hash(user.password, 10);

  const match = await bcrypt.compareSync(user.password, encryptedPassword);
  if (match) {
    try {
      const done = await User.create({
        name: user.name,
        email: user.email,
        password: encryptedPassword,
      });
      if (done) {
        console.log('User.create:::', done.dataValues);
        res.json({ result: true, user: done.dataValues });
      }
    } catch (error) {
      res.status(401).send({
        result: false,
        message: error.message,
      });
    }
  }
});

module.exports = router;
