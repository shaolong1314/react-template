/*
 * @Author: shaolong
 * @Date: 2022-11-21 17:20:36
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 13:54:49
 * @Description:
 */
// 异步获取路由 -- 路由储存在sessionStorage
// 路由本身进行路由鉴权
// 更新路由只能是重新登录
import React, { Suspense, useState, useEffect } from "react";
import routes, { filterAsyncRouter, handelMergeRoutes } from "@/routers";
import _NProgress from "@/components/NProgress";
import { useRoutes } from "react-router-dom";
import { getAsyncRoutes } from "@/store/user";
import { useSelector, shallowEqual } from "react-redux";
import { deepCopy } from "./utils/format";
// useRoutes只能作用于router context中，所以useRoutes需要写在一个子组件里被BrowserRouter引用
function App() {
  const [allRoutes, setAllRoutes] = useState(routes);
  const asyncRoutes = useSelector(getAsyncRoutes, shallowEqual);
  // 监听路由表改变重新渲染
  useEffect(() => {
    // 深拷贝state数据 不能影响到store里的数据！
    // filterAsyncRouter 映射对应组件
    // handelMergeRoutes 将路由表嵌入默认路由表得到完整路由表
    const _allRoutes = handelMergeRoutes(filterAsyncRouter(deepCopy(asyncRoutes)));
    setAllRoutes(_allRoutes);
  }, [asyncRoutes]);

  const elements = useRoutes(allRoutes);
  return <Suspense fallback={<_NProgress />}>{elements}</Suspense>;
}

export default App;
