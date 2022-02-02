"use strict";

module.exports = (sequelize, DataTypes) => {
  // 테이블 정의 함수
  return sequelize.define("user", {
    name: {
      type: DataTypes.STRING(45),
    },
    age: {
      type: DataTypes.INTEGER,
    },
  });
};
