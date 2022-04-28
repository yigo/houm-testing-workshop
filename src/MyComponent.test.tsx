import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("MyComponent should greet user", () => {
  render(<MyComponent />)
  expect(screen.getByText("WELLCOME_USER")).toBeInTheDocument();