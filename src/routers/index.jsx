/*
 * @Author: shaolong
 * @Date: 2022-11-21 17:36:16
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 14:43:01
 * @Description:
 */
import React, { lazy } from "react";
// import Home from "@/views/Home";
import Login from "@/views/login";
import { Navigate } from "react-router-dom";
import { getToken } from "@/utils/auth";
import Layouts from "@/components/Layout/index.jsx";
import Icons from "@/components/Icons";
import { deepCopy } from "@/utils/format";

// 懒加载函数
const lazyLoad = (moduleName) => {
  const Module = lazy(() => import(`@/views/${moduleName}`));
  return <Module />;
};
// 鉴权组件
const Appraisal = ({ children }) => {
  // 需要登录鉴权的组件
  const token = getToken();
  return token ? children : <Navigate to='/login' />;
};
const routes = [
  {
    path: "/",
    element: <Navigate to='/home' />
  },
  {
    type: "Layouts",
    element: <Layouts />,
    children: [
      {
        path: "/home",
        key: "/home",
        element: <Appraisal>{lazyLoad("Home")}</Appraisal>,
        meta: {
          icon: "HomeOutlined",
          label: "首页"
        }
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
    hidden: true
  },
  {
    path: "*",
    element: lazyLoad("not-found"),
    hidden: true
  }
];

export const filterAsyncRouter = (routers) => {
  let layoutRoutesArr = [];
  routers.forEach((router) => {
    if (router.element == "Layouts") {
      if (router.children && router.children.length > 0) {
        layoutRoutesArr = [...layoutRoutesArr, ...filterAsyncRouter(router.children)];
      }
    } else {
      const element = router.element;
      router.element = 1 === 1 ? <Appraisal>{lazyLoad(element)}</Appraisal> : lazyLoad(element); // 可以进行权限判断，这里默认动态路由全部需要鉴权
      layoutRoutesArr.push(router);
    }
  });
  return layoutRoutesArr;
};

// 整合所有路由
export const handelMergeRoutes = (asyncRoutes) => {
  // 将Layouts组件push到type为Layouts的跟路由中
  if (!asyncRoutes || asyncRoutes.length === 0) return routes;
  return routes.map((item) => {
    const obj = {
      ...item
    };
    if (item.type == "Layouts") {
      if (item.children && item.children.length > 0) {
        obj.children = [...item.children, ...asyncRoutes];
      } else {
        obj.children = asyncRoutes;
      }
    }
    return obj;
  });
};

// 侧边栏列表获取
export function filterMenuList(asyncRoutes) {
  let allRoutes = [];
  routes.forEach((item) => {
    if (item.type == "Layouts") {
      if (item.children && item.children.length > 0) {
        allRoutes = [...allRoutes, ...item.children];
      }
    }
  });
  return filterAllRoutes([...allRoutes, ...asyncRoutes]);
}
function filterAllRoutes(allRoutes) {
  const menuArrays = [];
  allRoutes.forEach((item) => {
    if (!item.hidden && item.meta && item.meta.label) {
      const menuItem = {
        label: item.meta.label,
        key: item.path
      };
      if (item.children && item.children.length > 0) {
        menuItem.children = filterAllRoutes(item.children);
      }
      if (item.meta.icon) {
        menuItem.icon = item.meta.icon;
      }
      menuArrays.push(menuItem);
    }
  });
  return menuArrays;
}

export function mapIconMenus(menuList) {
  return menuList.map((item) => {
    const obj = {
      ...item
    };
    if (obj.icon) {
      obj.icon = <Icons icon={obj.icon}></Icons>;
    }
    if (obj.children && obj.children.length > 0) {
      obj.children = mapIconMenus(obj.children);
    }
    return obj;
  });
}

export default routes;
