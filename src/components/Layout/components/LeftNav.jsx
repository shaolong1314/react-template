/*
 * @Author: shaolong
 * @Date: 2022-12-06 10:44:50
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 14:49:39
 * @Description:
 */
import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { mapIconMenus } from "@/routers";
import { useSelector, shallowEqual } from "react-redux";
import { getMenuList } from "@/store/user";

const { Sider } = Layout;

export default function LeftNav(props) {
  const Location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([Location.pathname]);

  // 获取全部路由进行格式化
  const _menuList = useSelector(getMenuList, shallowEqual);
  const menuList = useMemo(() => mapIconMenus(_menuList), [_menuList]);
  const rootSubmenuKeys = useMemo(() => menuList.map((item) => item.key), [menuList]);

  const whd = (e) => {
    navigate(e.key);
  };
  const onOpenChange = (Keys) => {
    const latestOpenKey = Keys.find((key) => openKeys.indexOf(key) === -1); // 找到最新的openKey
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(Keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    setSelectedKeys([Location.pathname]);
    const defaultOpenKey = rootSubmenuKeys.find((item) => Location.pathname.indexOf(item) !== -1);
    if (defaultOpenKey) {
      setOpenKeys([defaultOpenKey]);
    }
  }, [Location.pathname]);
  return (
    <Sider trigger={null} collapsible collapsed={props.zdState}>
      <div className='logo'>
        <i></i>
        <span style={{ display: props.zdstate ? "none" : "" }}>React Admin</span>
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={[Location.pathname]} items={menuList} onClick={whd} onOpenChange={onOpenChange} openKeys={openKeys} selectedKeys={selectedKeys} />
    </Sider>
  );
}
