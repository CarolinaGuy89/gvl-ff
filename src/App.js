import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect  } from 'react';
import SiteHeader from './components/SiteHeader';
import Team from './pages/team.js'
import Draft from './pages/draft'
import Home from './pages/home'
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';

function App() {
    const [leagueId, setLeagueId] = useState(1248073066);

    // Define a function to receive the value from the child component
    function handleLeagueIdChange(newLeagueId) {
      setLeagueId(newLeagueId);
    }


  return (
    <>
    <SiteHeader onLeagueIdChange={handleLeagueIdChange} />
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route to the Team component */}
          <Route path="/" element={<Home leagueId = {leagueId} />} />
          <Route path="/team" element={<Team leagueId = {leagueId} />} />
          <Route path="/draft" element={<Draft leagueId ={leagueId} />} />

          {/* Other routes can be added here */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
