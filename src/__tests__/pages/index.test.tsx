import { render } from "@testing-library/react";
import Home from "@pages/index";

describe("HomePage", () => {
  it("home page content rendered properly", () => {
    const { container } = render(<Home />);

    expect(container.firstChild?.hasChildNodes()).toBeTruthy();
  });
});
