import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

test("should trigger onClick function on click", () => {
  const mockOnClick = jest.fn();
  render(<Button onClick={mockOnClick}/>);
  fireEvent.click(screen.getByText("click me"));
  expect(mockOnClick).toHaveBeenCalled();
});