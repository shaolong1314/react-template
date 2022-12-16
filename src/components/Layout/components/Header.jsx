/*
 * @Author: shaolong
 * @Date: 2022-10-17 09:30:51
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-06 13:49:49
 * @Description:
 */
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Breadcrumb } from "antd";
import Main from "./Main";

const { Header } = Layout;
export default function LayoutHeader(props) {
  const [collapsed, setCollapsed] = useState(true);
  const clickColl = () => {
    setCollapsed(!collapsed);
    props.folding(collapsed);
  };
  return (
    <Layout className='site-layout'>
      <Header
        className='site-layout-background'
        style={{
          padding: 0
        }}
      >
        <div onClick={clickColl} className='trigger'>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className='Breadcrumb'>
          <Breadcrumb>
            <Breadcrumb.Item href='/'>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href=''>Application List</Breadcrumb.Item>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className='loginOut'></div>
      </Header>
      <Main />
    </Layout>
  );
}
