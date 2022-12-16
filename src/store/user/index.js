/*
 * @Author: shaolong
 * @Date: 2022-12-05 13:40:32
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 14:42:03
 * @Description: 用户store
 */

import { setToken, getToken, removeToken, removeReduxPersist } from "@/utils/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, getInfo } from "@/api/login";
import { trimAsyncRoutes } from "@/utils/format.js";
import { getListByRole } from "@/api/sysManage/menuManage";
import { filterMenuList } from "@/routers";

import { message } from "antd";

const initialState = {
  token: getToken() || "",
  name: "",
  avatar: "",
  roles: [],
  permissions: [],
  asyncRoutes: [], // 接口返回的动态路由
  userInfo: {} /* 用户详细信息 */,
  menuList: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_TOKEN: (state, { payload }) => {
      state.token = payload;
    },
    SET_PERMISSIONS: (state, { payload }) => {
      state.permissions = payload;
    },
    SET_USER: (state, { payload }) => {
      state.userInfo = payload;
    },
    SET_ASYNCROUTES: (state, { payload }) => {
      state.asyncRoutes = payload;
    },
    SET_MENUlIST: (state, { payload }) => {
      state.menuList = payload;
    }
  }
});

// 导出action creator
export const { SET_TOKEN, SET_PERMISSIONS, SET_USER, SET_ASYNCROUTES, SET_MENUlIST } = userSlice.actions;

// 登录
export const fetchLogin = createAsyncThunk("user/fetchLogin", (params, { dispatch, getState }) => {
  return new Promise(async (resolve, reject) => {
    let result = null;
    if (params.type == "phone") {
      result = await userLogin(params).catch((err) => {
        reject(err);
      });
      // console.log("手机号登录 => ", result);
    } else if (params.type == "username") {
      result = await login(params).catch((err) => {
        reject(err);
      });
      // console.log("用户名密码登录 => ", result);
    }

    if (result) {
      message.success({
        content: "登录成功",
        duration: 2
      });
      const { code } = result;
      if (code == 200) {
        setToken(result.data.token);
        dispatch(SET_TOKEN(result.data.token));
        // 登录成功之后，获取用户信息以及权限菜单
        await dispatch(fetchUserInfo());
        await dispatch(fetchAsyncRoutes());
        resolve(result);
      } else if (code == 1007) {
        message.error("用户已被停用");
        return reject();
      } else if (code == 1008) {
        message.error("用户不存在或者密码错误");
        return reject();
      } else if (code == 1009) {
        message.error("验证码错误");
        return reject();
      } else {
        message.error(result.msg);
      }
    } else {
      reject(result);
    }
  });
});

// 退出登录
export const fetchOut = createAsyncThunk("user/fetchOut", (params, { dispatch, getState }) => {
  return new Promise((resolve, reject) => {
    logout()
      .then(() => {
        dispatch(SET_TOKEN());
        dispatch(SET_PERMISSIONS());
        removeToken();
        removeReduxPersist();
        resolve();
      })
      .catch((error) => {
        dispatch(SET_TOKEN());
        dispatch(SET_PERMISSIONS());
        removeToken();
        removeReduxPersist();
        reject(error);
      });
  });
});

// 获取用户信息
export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", (params, { dispatch, getState }) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    getInfo(state.token)
      .then((res) => {
        console.log(res);
        const _result = res.data;
        if (_result.role && _result.role.role_menu) {
          _result.roles = _result.role.role_menu.map((item) => {
            return item.menu && item.menu.permission;
          });
        }
        dispatch(SET_USER(_result));
        resolve(_result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
});

// 获取动态routes
export const fetchAsyncRoutes = createAsyncThunk("user/fetchAsyncRoutes", (params, { dispatch, getState }) => {
  return new Promise((resolve, reject) => {
    getListByRole()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          try {
            // 更新路由
            const asyncRoutes = trimAsyncRoutes(res.data);
            dispatch(SET_ASYNCROUTES(asyncRoutes));

            // 获取菜单列表
            const menuList = filterMenuList(asyncRoutes);
            dispatch(SET_MENUlIST(menuList));
          } catch (error) {
            console.log(error);
          }

          resolve();
        } else {
          resolve();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
});

// 导出用户信息
export const getUserInfo = (state) => state.user.userInfo;

// 导出动态路由
export const getAsyncRoutes = (state) => state.user.asyncRoutes;

// 导出动态路由
export const getMenuList = (state) => state.user.menuList;

export default userSlice.reducer;
