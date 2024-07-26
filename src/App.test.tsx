import React from "react";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import App from "./App";

test("Renders the application and selects a city", async () => {
  /**
   * =========================================================================
   * First, let the application initialize and render the loading state.
   * =====================================================================
   */
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText(/Weather Report 2000/i)).toBeInTheDocument();
  expect(screen.getByText(/Add/i)).toBeInTheDocument();

  // Await MSW to intercept the request and return the mocked data
  await screen.findByText("Open to select a city");

  /**
   * =========================================================================
   * Trigger a change event on the add city select input and click the add button.
   * =====================================================================
   */
  const menuSelect = screen.getByTestId("add-city-input");
  fireEvent.change(menuSelect, {
    target: {
      value: "1",
    },
  });

  expect(screen.getByText(/City 1/i)).toBeInTheDocument();

  const addCityBtn = screen.getByTestId("add-city-btn");
  fireEvent.click(addCityBtn);
});
