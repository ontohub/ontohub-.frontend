import { MarkdownViewer } from "../markdown-viewer";

describe("MarkdownViewer", () => {
  set("component", () => (
    <MarkdownViewer
      value={`
# Hello [World](https://ontohub.org)

\`\`\`
() => null;
\`\`\`
`}
    />
  ));
  set("renderedComponent", () => render(component));

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
