/*
 * @Author: shaolong
 * @Date: 2022-11-23 15:25:16
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-05 10:44:21
 * @Description:
 */
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getInfo } from "@/api/login";
import { setToken, getToken } from "@/utils/auth";
// import { useNavigate } from "react-router-dom";

const initialState = {
  token: getToken() || "",
  list: [],
  status: "idle",
  error: null,
  useInfo: {}
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addPosts: (state, action) => {
    //   state.push(action.payload);
    // },
    addPosts: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      // prepare为该reducer创建action的payload
      prepare: (title, content) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        };
      }
    },
    updatePosts: (state, action) => {
      const { id, title, content } = action.payload;
      const target = state.list.find((item) => item.id === id);
      if (target) {
        target.title = title;
        target.content = content;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "success";
        state.list = state.list.concat(action.payload);
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.useInfo = action.payload;
      });
  }
});

// 导出action creator
export const { addPosts, updatePosts } = postsSlice.actions;

// 获取状态
export const selectPosts = (state) => state.posts.list;

export const selectPostsById = (state, id) => state.posts.list.find((item) => item.id === id);

// 异步获取数据 创建一个thunk函数
export const fetchLists = createAsyncThunk("posts/fetchLists", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = [
        { id: "1", title: "First Post!", content: "Hello!" },
        { id: "2", title: "Second Post", content: "More text" }
      ];
      resolve(list);
      // reject(new Error("错误"));
    }, 3000);
  });
});

// 登录接口
export const fetchLogin = createAsyncThunk("posts/fetchLogin", async (params, { dispatch, getState }) => {
  const result = await login();
  setToken(result.data.token);

  await dispatch(getUserInfo());
  return result.data.token;
});

// 获取用户信息
export const getUserInfo = createAsyncThunk("posts/getUserInfo", async () => {
  return new Promise((resolve, reject) => {
    getInfo().then((result) => {
      resolve(result.data);
    });
  });
});

export default postsSlice.reducer;
