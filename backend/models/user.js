'use strict';

module.exports = (sequelize, DataTypes) => {
  // 테이블 정의 함수
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(45),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    introduce: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(100),
    },
  });
};

// 1) 비밀번호 암호화 bcrypt
// 2) DB테이블 스키마 변경
// 3) post로 전달된 값을 DB에 저장한다.
