import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </div>
  );
};

export default App;
