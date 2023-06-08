import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "./components/commonComponents/Alert";

describe("Alert component", () => {
  const message = "Are you sure you want to delete this item?";
  const onYesClick = jest.fn();
  const onNoClick = jest.fn();

  beforeEach(() => {
    onYesClick.mockClear();
    onNoClick.mockClear();
  });

  test("renders the message", () => {
    const { getByText } = render(
      <Alert message={message} onYesClick={onYesClick} onNoClick={onNoClick} />
    );

    expect(getByText(message)).toBeInTheDocument();
  });

  test("clicks Yes button", () => {
    const { getByText } = render(
      <Alert message={message} onYesClick={onYesClick} onNoClick={onNoClick} />
    );

    const yesButton = getByText("Yes");
    fireEvent.click(yesButton);

    expect(onYesClick).toHaveBeenCalledTimes(1);
  });

  test("clicks No button", () => {
    const { getByText } = render(
      <Alert message={message} onYesClick={onYesClick} onNoClick={onNoClick} />
    );

    const noButton = getByText("No");
    fireEvent.click(noButton);

    expect(onNoClick).toHaveBeenCalledTimes(1);
  });

  test("closes the Alert after clicking a button", () => {
    const { getByText, queryByText } = render(
      <Alert message={message} onYesClick={onYesClick} onNoClick={onNoClick} />
    );

    const yesButton = getByText("Yes");
    fireEvent.click(yesButton);

    expect(queryByText(message)).not.toBeInTheDocument();
  });
});
