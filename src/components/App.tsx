import { greet } from "../greet";
import { MyComponent } from "./MyComponent";

function App() {
    return (
        <div className="App">
            <MyComponent />
            <RotaGame />
            {greet("scholar")}
        </div>
    );
}

export default App;

function RotaGame() {
    return <div className="game"></div>;
}
