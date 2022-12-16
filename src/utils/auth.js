/*
 * @Author: shaolong
 * @Date: 2022-12-01 15:51:18
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-14 15:23:25
 * @Description:
 */
import Cookies from "js-cookie";

const TokenKey = process.env.REACT_APP_TOKEN_KEY;

const ExpiresInKey = process.env.REACT_APP_EXPIRES_KEY;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires = 7 * 24 * 60) {
  Cookies.set(TokenKey, token, { expires: expires / 24 / 60 });
}

export function removeToken() {
  Cookies.remove(TokenKey);
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  Cookies.remove(ExpiresInKey);
}

// 清除redux-persist持久化数据
export function removeReduxPersist() {
  sessionStorage.removeItem(process.env.REACT_APP_STORE_KEY);
}
