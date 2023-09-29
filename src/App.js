import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useCallback } from 'react';
import SiteHeader from './components/SiteHeader';
import Team from './pages/team';
import Draft from './pages/draft';
import WeeklyOverview from './pages/WeeklyOverview.js';
import { calculateDefaultWeek } from './components/WeekSelect';
import Home from './pages/Home';

function App() {
    const [leagueId, setLeagueId] = useState(1248073066);
    const [weeklyMatchup, setWeeklyMatchup] = useState();
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);
    // Define a function to receive the value from the child component
    function handleLeagueChange(newLeagueId) {
      setWeeklyMatchup(newLeagueId);
    }
    console.log('Weekly Matchup (App.js)',weeklyMatchup)
  return (
    <>
    <Router>
    <SiteHeader handleLeagueChange={handleLeagueChange} />
        {/*<WeekSelector onWeekChange={handleWeekChange}/>*/}
        <Routes>
          {/* League Routes */}
          <Route path="/gvl" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/family" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/it" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/hockey" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </>
  );
}

function LeagueRoutes({ leagueName }) {
  return (
    <>
      <Routes>
        {/*Routes for each league */}
        <Route path="/overview" element={<WeeklyOverview leagueName={leagueName} />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;


