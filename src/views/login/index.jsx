/*
 * @Author: shaolong
 * @Date: 2022-12-05 10:08:21
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-14 17:59:07
 * @Description:
 */
import React from "react";
import LoginFrom from "./components/LoginFrom";
import "./login.scss";
import LeftImg from "../../images/login_left-1b40bd1b.png";
import RightLogin from "../../images/logo192.png";

function Login() {
  return (
    <div className='loginMain'>
      <div className='loginMain_1'>
        <div className='loginLeft'>
          <img src={LeftImg} alt='pic' />
        </div>
        <div className='loginRIght'>
          <div className='loginRIght_top'>
            <img src={RightLogin} alt='' />
            <p>Hooks-Admin</p>
          </div>
          <LoginFrom />
        </div>
      </div>
    </div>
  );
}
export default Login;
