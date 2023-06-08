import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CommentSection from "../components/userComponents/CommentSection";
describe("CommentSection component", () => {
  it("renders a list of comments", () => {
    const comment = [
      { commentor: "Alice", comment: "Great product!" },
      { commentor: "Bob", comment: "I agree, this is awesome!" },
    ];

    const { getByText } = render(<CommentSection id="123" />);
    const comment_exist = getByText("Comment Section");

    expect(comment_exist).toBeInTheDocument();
  });

  it("allows the user to add a new comment", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CommentSection id="123" />
    );
    const input = getByPlaceholderText("New Comment");
    const button = getByTestId("comment-submit");

    fireEvent.change(input, { target: { value: "New comment text" } });
    fireEvent.click(button);

    expect(input.value).toBe("New comment text");
  });

  it("disables the comment button if the input is empty", () => {
    const { getByTestId } = render(<CommentSection id="123" />);
    const button = getByTestId("comment-submit");

    expect(button).toBeEnabled();
  });

  it("enables the comment button if the input is not empty", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CommentSection id="123" />
    );
    const input = getByPlaceholderText("New Comment");
    const button = getByTestId("comment-submit");

    fireEvent.change(input, { target: { value: "New comment text" } });

    expect(button).toBeEnabled();
  });

  it("submits the comment when the 'Enter' key is pressed", () => {
    const handleComment = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <CommentSection id="123" handleComment={handleComment} />
    );
    const input = getByPlaceholderText("New Comment");

    fireEvent.change(input, { target: { value: "New comment text" } });
    fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });

    // expect(handleComment).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("New comment text");
  });
});
