const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
  //bcrypt 적용
  // 각 항목에 대한 예외 처리에 주의

  try {
    const user = req.body.user;
    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const duplicateUser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (duplicateUser) {
      // user가 있으면 오류 처리
      // throw new Error('duplicate user');
      res.status(401).json({ result: false, message: 'duplicate user!!' }); //하단의 오류와는 별개이기때문에 따로 에러를 처리해준다.
      return;
    }

    const created = await User.create({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });

    if (created) {
      res.json({ result: true, user: created });
    }

    console.log('User.create:::', created);
  } catch (err) {
    console.error(err);
    res.status(401).json({
      result: false,
      error: err.message,
    });
  }

  // const match = await bcrypt.compareSync(user.password, encryptedPassword); //불필요
  // 이메일 중복 체크
});

module.exports = router;
