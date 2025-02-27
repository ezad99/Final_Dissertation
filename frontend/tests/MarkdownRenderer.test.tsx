import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MarkdownRenderer from "../src/components/MarkdownRenderer";

describe("MarkdownRenderer Component", () => {
  it("renders markdown content correctly", () => {
    const markdownContent = "# Hello World";
    
    render(<MarkdownRenderer content={markdownContent} />);

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent("Hello World");
  });

  it("renders inline code correctly", () => {
    const markdownContent = "This is `inline code` inside text.";

    render(<MarkdownRenderer content={markdownContent} />);

    const inlineCode = screen.getByText("inline code");
    expect(inlineCode).toBeInTheDocument();
    expect(inlineCode.tagName).toBe("CODE");
  });
});
