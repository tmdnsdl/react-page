import refresh from "./refresh.png";
import share from "./share.png";
import loadingImg from "./loading.gif";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState("");

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

    async function onShare() {
        const catImg = { cat }.cat;

        if (navigator.share) {
            navigator
                .share({
                    title: "고양이 탐색기",
                    text: "고양이 탐색기",
                    url: catImg,
                })
                .then(() => {
                    console.log("sharing success");
                })
                .catch(console.error);
        } else {
            // fallback
        }
    }

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
                    <input onClick={onShare} type="image" src={share} />
                </div>
            </header>
        </div>
    );
}

export default App;
