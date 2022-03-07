import refresh from "./refresh.png";
import share from "./share.png";
import loadingImg from "./loading.gif";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState("");
    const [blob, setBlob] = useState([]);

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/images/search").then((response) =>
            response.json().then((json) => {
                setCat(json[0].url);
                setLoading(false);
            })
        );
    }, []);

    const Refresh = () => {
        setLoading(true);
        fetch("https://api.thecatapi.com/v1/images/search").then((response) =>
            response.json().then((json) => {
                setCat(json[0].url);
                setLoading(false);
            })
        );
    };

    const Copy = () => {
        console.log(blob);
        navigator.share({
            title: "고양이 탐색기",
            url: { cat }.cat,
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>고양이 탐색기</p>
                {loading ? (
                    <img src={loadingImg} className="loading" />
                ) : (
                    <div className="cat-box">
                        <img src={cat} className="cat-image" />
                    </div>
                )}
                <div style={{ marginTop: "20px" }}>
                    <input onClick={Refresh} type="image" src={refresh} />
                    <input onClick={Copy} type="image" src={share} />
                </div>
            </header>
        </div>
    );
}

export default App;
