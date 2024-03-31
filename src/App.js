import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { PageHome } from "./components/PageHome";
import { Header } from "./components/Header";
import { PageCreateThread } from "./components/PageCreateThread";
import { PageThread } from "./components/PageThread";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/createThread" element={<PageCreateThread />} />
                <Route path="/thread" element={<PageThread />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
