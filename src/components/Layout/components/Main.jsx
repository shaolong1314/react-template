/*
 * @Author: shaolong
 * @Date: 2022-12-06 10:44:50
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-06 10:45:06
 * @Description:
 */
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
export default function Main() {
  return (
    <Content
      className='site-layout-background'
      style={{
        margin: "15px",
        padding: 15,
        minHeight: 280
      }}
    >
      {/* 占位符 */}
      <Outlet />
    </Content>
  );
}
