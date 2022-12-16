/*
 * @Author: shaolong
 * @Date: 2022-12-06 10:26:58
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 14:43:59
 * @Description:
 */
import React, { useState } from "react";
import { Layout } from "antd";
import LeftNav from "./components/LeftNav";
import LayoutHeader from "./components/Header";

export default function Layouts() {
  const [zdState, setZdState] = useState(false);
  const folding = (value) => {
    setZdState(value);
  };
  return (
    <Layout>
      <LeftNav zdState={zdState} />
      <LayoutHeader folding={folding} />
    </Layout>
  );
}
