"use strict";

module.exports = (sequelize, DataTypes) => {
  // 테이블 정의 함수
  return sequelize.define("post", {
    content: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
};
