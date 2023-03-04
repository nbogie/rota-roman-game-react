import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { RotaGameC } from "./RotaGameC";

function App() {
    return (
        <div className="App">
            <RotaGameC />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                closeOnClick
                hideProgressBar={true}
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
