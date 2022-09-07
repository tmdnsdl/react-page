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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
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

        if (window.Kakao) {
            const kakao = window.Kakao;

            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_KAKAO);
            }
            kakao.Link.sendDefault({
                objectType: "feed",
                content: {
                    title: "고양이 탐색기",
                    description: "고양이 사진 공유",
                    imageUrl: catImg,
                    link: {
                        mobileWebUrl: "https://tmdnsdl.github.io/react-page/",
                        webUrl: "https://tmdnsdl.github.io/react-page/",
                    },
                },
            });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>고양이 탐색기</p>
                {loading ? (
                    <img src={loadingImg} alt="loading" className="loading" />
                ) : (
                    <div className="cat-box">
                        <img src={cat} alt="cat_image" className="cat-image" />
                    </div>
                )}
                <div style={{ marginTop: "20px" }}>
                    <input
                        onClick={Refresh}
                        type="image"
                        alt="refresh"
                        src={refresh}
                    />
                    <input
                        onClick={onShare}
                        type="image"
                        alt="share"
                        src={share}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
