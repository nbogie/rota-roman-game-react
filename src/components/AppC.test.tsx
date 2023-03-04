import AppC from "./AppC";
import { render, screen } from "../utils/test-utils";

//An example of using react-testing-library
test("Input", async () => {
    it("should render the input", () => {
        render(<AppC />);
        expect(screen.getByText("Cool thing to test")).toBeInTheDocument();
    });
});
