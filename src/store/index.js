/*
 * @Author: shaolong
 * @Date: 2022-11-22 17:20:33
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 14:23:13
 * @Description: 创建 Redux store 实例
 */
import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reduces"; // 导入合并后的reducer

import { persistStore, persistReducer } from "redux-persist"; // **
import storageSession from "redux-persist/lib/storage"; // **

const persistConfig = {
  // **
  key: process.env.REACT_APP_STORE_KEY, // 储存的标识名
  storage: storageSession, // 储存方式
  whitelist: ["user"] // 白名单 模块参与缓存
};

const persistedReducer = persistReducer(persistConfig, Reducer);

// 创建 Redux store 实例
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false })],
  devTools: true
});

export const persistor = persistStore(store);

export default store;
