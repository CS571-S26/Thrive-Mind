import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Home";
import MoodChecker from "./Components/MoodChecker";
import Issues from "./Components/Issues";
import Resources from "./Components/Resources";
import SelfCarePlanner from "./Components/SelfCarePlanner"; // new self-care planner page


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<MoodChecker />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/planner" element={<SelfCarePlanner />} /> {/* new self-care planner route */}
      </Routes>
    </>
  );
}

export default App;