import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/commonComponents/NavBar";

test("renders the NavBar component without crashing", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
});

test("clicking the Home link navigates to the home page", () => {
  const { getByText } = render(
    <Router>
      <NavBar />
    </Router>
  );
  fireEvent.click(getByText("Home"));
  expect(window.location.pathname).toBe("/");
});

test("clicking the My Products link navigates to the My Products page", () => {
  const { getByText } = render(
    <Router>
      <NavBar />
    </Router>
  );
  fireEvent.click(getByText("My Products"));
  expect(window.location.pathname).toBe("/myproducts");
});

test("clicking the Sold Products link navigates to the Sold Products page", () => {
  const { getByText } = render(
    <Router>
      <NavBar />
    </Router>
  );
  fireEvent.click(getByText("Sold Products"));
  expect(window.location.pathname).toBe("/soldproducts");
});

// test("renders the Notification component when there are notifications", () => {
//   const { getByText, queryByText } = render(
//     <Router>
//       <NavBar />
//     </Router>
//   );
//   expect(queryByText("Notification")).toBeNull(); // Notification component should not be rendered initially
//   const notificationLink = getByText("My Products");
//   fireEvent.click(notificationLink);
//   expect(queryByText("Notification")).not.toBeNull(); // Notification component should be rendered after clicking the link
// });

test("does not render the NavBar component on sign in or sign up pages", () => {
  const { queryByTestId } = render(
    <Router>
      <NavBar />
    </Router>,
    { route: "/signin" }
  );
  expect(queryByTestId("navbar")).toBeNull(); // NavBar component should not be rendered on sign in page
  render(
    <Router>
      <NavBar />
    </Router>,
    { route: "/signup" }
  );
  expect(queryByTestId("navbar")).toBeNull(); // NavBar component should not be rendered on sign up page
});
