import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { PageHome } from "./components/PageHome";
import { Header } from "./components/Header";
import { PageCreateThread } from "./components/PageCreateThread";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/createThread" element={<PageCreateThread />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
