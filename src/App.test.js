/*
 * @Author: shaolong
 * @Date: 2022-11-21 17:20:36
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-22 15:29:48
 * @Description:
 */
import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

// eslint-disable-next-line no-undef
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
