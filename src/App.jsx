import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import MoodChecker from "./components/MoodChecker";
import Issues from "./components/Issues";
import Resources from "./components/Resources";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<MoodChecker />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </>
  );
}

export default App;