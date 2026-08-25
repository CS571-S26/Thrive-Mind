import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Home";
import MoodChecker from "./Components/MoodChecker";
import Issues from "./Components/Issues";
import Resources from "./Components/Resources";
import SelfCarePlanner from "./Components/SelfCarePlanner"; // new self-care planner page
import AboutUs from "./Components/AboutUs";
import Privacy from "./Components/Privacy";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NotFound from "./Components/NotFound";
import CrisisBanner from "./Components/CrisisBanner";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <CrisisBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<MoodChecker />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/planner" element={<SelfCarePlanner />} /> {/* new self-care planner route */}
        <Route path="/wellness" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;