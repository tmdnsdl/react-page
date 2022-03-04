import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>너구리 React APP</p>
                <a
                    className="App-link"
                    href="https://tmdnsdl.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    너구리 블로그
                </a>
            </header>
        </div>
    );
}

export default App;
