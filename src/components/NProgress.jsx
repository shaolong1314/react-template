/*
 * @Author: shaolong
 * @Date: 2022-12-07 15:45:45
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-07 15:47:33
 * @Description:
 */
import React, { useEffect, Fragment } from "react";

const _NProgress = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <Fragment />;
};

export default _NProgress;
