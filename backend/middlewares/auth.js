const { User } = require('../models');

module.exports = async (req, res, next) => {
  const headers = req.headers;
  // 1) 헤더에 값을 확인한다.
  // console.log(headers.authorizations);
  const token = headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'token not found' });
    //return으로 응답종료
  }

  // 2) 헤더가 유효한지 확인한다.
  const user = await User.findOne({
    where: {
      token: token,
    },
  });
  // JWT (JSON WEB TOKEN) : PASSPORT
  // DB를 찌르는 로직이 사라진다.
  console.log('user:::', user);

  if (user) {
    next();
  } else {
    res.status(401).json({ error: 'token invalid' });
  }
  // 3) 다음으로 보낼지 결정한다.
};
