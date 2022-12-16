/*
 * @Author: shaolong
 * @Date: 2022-12-15 14:11:09
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-15 14:11:10
 * @Description:
 */
import React from "react";
import * as icons from "@ant-design/icons";

const Icon = (props) => {
  const { icon } = props;
  const antIcon = icons;
  return React.createElement(antIcon[icon]);
};

export default Icon;
