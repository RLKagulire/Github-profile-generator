import { useState } from "react";
import InputForm from "./components/InputForm"
import Profile from "./components/Profile";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/user" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;