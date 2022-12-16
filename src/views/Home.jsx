/*
 * @Author: shaolong
 * @Date: 2022-11-21 17:51:01
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-07 14:53:21
 * @Description:
 */

import React from "react";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div>
      home
      <Outlet />
    </div>
  );
}

export default Home;
