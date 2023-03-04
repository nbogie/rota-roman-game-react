import App from "./App";
import { render, screen } from "../utils/test-utils";

//An example of using react-testing-library
test("Input", async () => {
    it("should render the input", () => {
        render(<App />);
        expect(screen.getByText("Cool thing to test")).toBeInTheDocument();
    });
});
