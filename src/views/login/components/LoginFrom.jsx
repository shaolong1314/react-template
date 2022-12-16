/*
 * @Author: shaolong
 * @Date: 2022-12-14 17:48:33
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-14 17:52:43
 * @Description:
 */
/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import { LockOutlined, UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/user/index";
import { useNavigate } from "react-router-dom";

export default function LoginFrom() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    if (values.username === "admin" || values.password === 123456) {
      setLoading(true);
      dispatch(
        fetchLogin({
          type: "username",
          username: values.username,
          password: values.password
        })
      ).then(() => {
        navigate("/");
      });
    } else {
      message.error("密码或账号错误！");
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      name='normal_login'
      className='login-form'
      form={form}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: "请输入用户名!"
          }
        ]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='请输入用户名(admin)' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "请输入密码!"
          }
        ]}
      >
        <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='请输入密码(123456)' />
      </Form.Item>
      <Form.Item>
        <div className='loginButton'>
          <Button icon={<CloseCircleOutlined />} size='large' onClick={onReset}>
            重置
          </Button>
          <Button type='primary' htmlType='submit' className='login-form-button' icon={<UserOutlined />} size='large' loading={loading}>
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
