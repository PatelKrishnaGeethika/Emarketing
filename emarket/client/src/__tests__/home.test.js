import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.js";

describe("Home component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  test("renders SearchBar component within Home component", () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    const searchBar = container.getElementsByClassName("searchbar")[0];
    expect(searchBar).toBeInTheDocument();
  });

  test("renders DisplayData component within Home component", () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    const displayData = container.getElementsByClassName("display-data")[0];
    expect(displayData).toBeInTheDocument();
  });

  test("renders Pagenation component within Home component", () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    const pagenation = container.getElementsByClassName("pagenation")[0];
    expect(pagenation).toBeInTheDocument();
  });

  // test("changeUrl function sets new url", () => {
  //   const { result } = renderHook(() => Home());
  //   act(() => {
  //     result.current.changeUrl("new-url");
  //   });
  //   expect(result.current.url).toBe("new-url");
  // });

  // test("setPage function sets new page", () => {
  //   const { result } = renderHook(() => Home());
  //   act(() => {
  //     result.current.setPage(2);
  //   });
  //   expect(result.current.page).toBe(2);
  // });

  test("renders ProductList component within DisplayData component", () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    const productList = container.getElementsByClassName("productlist");
  });
});
