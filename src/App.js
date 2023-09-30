import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useCallback } from 'react';
import SiteHeader from './components/SiteHeader';
import Team from './pages/team';
import Draft from './pages/draft';
import WeeklyOverview from './pages/WeeklyOverview.js';
import { calculateDefaultWeek } from './components/WeekSelect';
import LeagueHome from './pages/LeagueHome';
import Home from './pages/Home';
import { WeekSelector } from './components/WeekSelect';

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
          <Route path="/gvl" element={<LeagueHome weeklyMatchup = {weeklyMatchup} />}>
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/family" element={<LeagueHome weeklyMatchup = {weeklyMatchup} />} >
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/it" element={<LeagueHome weeklyMatchup = {weeklyMatchup} />} >
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/hockey" element={<LeagueHome weeklyMatchup = {weeklyMatchup} />} >
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;


