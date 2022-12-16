/*
 * @Author: shaolong
 * @Date: 2022-12-14 11:44:36
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-14 17:00:55
 * @Description:
 */

import { combineReducers } from "redux";
import postsReducer from "./posts/postSlice";
import userReducer from "./user/index";

const Reducer = combineReducers({
  posts: postsReducer,
  user: userReducer
});

export default Reducer;
