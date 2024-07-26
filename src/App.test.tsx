import React from "react";
import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import App from "./App";

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText(/Weather Report 2000/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
};

test("Renders the application before any data is fetched", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText(/Weather Report 2000/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
});
