import "./App.css";
import { PageHome } from "./components/PageHome";
import { Header } from "./components/Header";
import { PageCreateThread } from "./components/PageCreateThread";

function App() {
  return (
    <div>
      <Header/>
      <PageCreateThread/>
    </div>
  );
}

export default App;
