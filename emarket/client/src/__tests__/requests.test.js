import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RequestList from "../components/userComponents/RequestList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const interestedPeeps = [
  {
    buyer: {
      id: 1,
      username: "julius",
      email: "julius@example.com",
      contact: "1234567890",
    },
    accept: false,
  },
  {
    buyer: {
      id: 2,
      username: "asta",
      email: "asta@example.com",
      contact: "0987654321",
    },
    accept: true,
  },
];

test("renders request list heading", () => {
  const { getByText } = render(
    <Router>
      <RequestList interested_peeps={interestedPeeps} />
    </Router>
  );
  const headingElement = getByText(/Request List:/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders request cards", () => {
  const { container } = render(
    <Router>
      <RequestList interested_peeps={interestedPeeps} />
    </Router>
  );
  const requestCards = container.getElementsByClassName("req-card");
  expect(requestCards).toHaveLength(interestedPeeps.length);
});

test("renders user info in request cards", () => {
  const { queryByText } = render(
    <Router>
      <RequestList interested_peeps={interestedPeeps} />
    </Router>
  );
  interestedPeeps.forEach(({ buyer }) => {
    expect(
      queryByText(new RegExp(`${buyer.username}`, "i"))
    ).toBeInTheDocument();
    expect(queryByText(new RegExp(`${buyer.email}`, "i"))).toBeInTheDocument();
    expect(
      queryByText(new RegExp(`${buyer.contact}`, "i"))
    ).toBeInTheDocument();
  });
});

test("clicking accept button updates accept status", () => {
  const { getByText } = render(
    <Router>
      <RequestList interested_peeps={interestedPeeps} />
    </Router>
  );
  const acceptButton = getByText(/accept/i);
  fireEvent.click(acceptButton);
  expect(acceptButton).toHaveTextContent(/accepted/i);
});

test("clicking reject button updates accept status", () => {
  const { container, getByText } = render(
    <Router>
      <RequestList interested_peeps={interestedPeeps} />
    </Router>
  );
  const rejectButton = container.getElementsByClassName("reject")[0];
  fireEvent.click(rejectButton);
  expect(rejectButton.previousSibling).toHaveTextContent("");
});
