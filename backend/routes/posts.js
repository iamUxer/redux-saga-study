const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('posts main');
});

// READ POST //
router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const post = await Post.findOne({ where: { id: id } });
    res.json({ result: true, post });
  } catch (err) {
    res.json({ reselt: false, err: err.message, post });
  }
});

// CREATE POST //

//async 안에서만 await을 사용할 수 있다.
//async 함수가 리턴하는 값은 프로미스다
router.post('/', async (req, res, next) => {
  const { content } = req.body; // 1) client에서 content를 받아오고
  try {
    const data = await Post.create({
      // 2) Post db의 content에 위에서 받아온 content를 생성해주고
      content: content,
    });
    res.json({ result: true, data }); // 3) 생성된 데이터 결과를 client에 응답해준다.
  } catch (err) {
    res.json({ result: false, err: err.message, data });
  }
});

// UPDATE POST //

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const post = await Post.findOne({
      where: { id: id },
    });
    const data = await post.update({
      content: content,
    });
    res.json({ result: true, data });
  } catch (err) {
    res.json({ result: false, err: err.message, data });
  }
});

// DELETE POST //

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const done = await Post.destroy({
      where: { id: id },
    });
    res.json({ result: true, done });
  } catch (err) {
    res.json({ result: false, err: err.message });
  }
});

module.exports = router;
