import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Simple Payment Form", () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple Payment Form/i);
  expect(linkElement).toBeInTheDocument();
});
