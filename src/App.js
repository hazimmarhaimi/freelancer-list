import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreelancerList from "./pages/FreelancerList";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import "./App.css";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <MainHeader />
        <div style={{ flex: "1", padding: "20px" }}>
          <Routes>
            <Route path="/freelancerlist" element={<FreelancerList />} />
            {/* Add other routes here */}
          </Routes>
        </div>
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;
