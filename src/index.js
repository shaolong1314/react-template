/*
 * @Author: shaolong
 * @Date: 2022-11-21 17:20:36
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-15 11:25:04
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import store from "./store/index";
import { Provider } from "react-redux";
// import router from "./routers";
import { BrowserRouter } from "react-router-dom"; // 挂载路由对象
import "./mock/app"; // 使用mock数据
import { ConfigProvider } from "antd"; // 自定义主题
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* 严格模式下，执行渲染两次 */}
    {/* <React.StrictMode> */}
    {/* 如果项目部署在服务器域名子目录下，就给BrowserRouter配置basename属性。 */}
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b"
          }
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ConfigProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

window.onerror = (error) => {
  console.log("application error ==>", error);
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
