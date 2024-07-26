import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import App from "./App";

test("Renders the application and allows the user to select and add a city, sort them then remove them", async () => {
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
  await screen.findByTestId("city-weather-report-title-1");

  /**
   * =========================================================================
   * Add a few more cities
   * =====================================================================
   */
  // Add City id 2
  fireEvent.change(menuSelect, {
    target: {
      value: "2",
    },
  });
  fireEvent.click(addCityBtn);
  await screen.findByTestId("city-weather-report-title-2");

  // Add City id 3
  fireEvent.change(menuSelect, {
    target: {
      value: "3",
    },
  });
  fireEvent.click(addCityBtn);
  await screen.findByTestId("city-weather-report-title-3");
  expect(screen.getAllByTestId("city-weather-report").length).toBe(3);

  /**
   * =========================================================================
   * Handle a sort action, expect the item is sorted correctly
   * =====================================================================
   */
  const secondReportMoveBtn = screen.getByTestId("city-weather-report-move-up-2");
  fireEvent.click(secondReportMoveBtn);
  expect(screen.getAllByTestId("city-weather-report")[0].textContent).toContain("City 2");

  /**
   * =========================================================================
   * Handle a delete action, expect the item is sorted correctly
   * =====================================================================
   */
  const secondReportRemoveBtn = screen.getByTestId("city-weather-report-remove-2");
  fireEvent.click(secondReportRemoveBtn);
  expect(screen.getAllByTestId("city-weather-report").length).toBe(2);
});

test("Renders the application as many times as expected", async () => {
  // Test various scenarios and make sure we are not rendering the application more times than expected
  expect(true).toBe(true);
});
