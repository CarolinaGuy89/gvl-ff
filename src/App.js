import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useCallback } from 'react';
import SiteHeader from './components/SiteHeader';
import Team from './pages/team';
import Draft from './pages/draft';
import WeeklyOverview from './pages/WeeklyOverview.js';
import { calculateDefaultWeek } from './components/WeekSelect';
import LeagueNav from './pages/LeagueNav';
import Home from './pages/Home';
import { WeekSelector } from './components/WeekSelect';
import LeagueHome from './pages/LeagueHome';


function App() {
    const [leagueId, setLeagueId] = useState(1248073066);
    const [weeklyMatchup, setWeeklyMatchup] = useState();
    const [leagueStandings, setleagueStandings] = useState();
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);
    // Define a function to receive the value from the child component
       
    function handleLeagueChange(newLeagueId) {
      setWeeklyMatchup(newLeagueId);
    }

    function handleLeagueOverivew(newLeaugeOverview){
      setleagueStandings(newLeaugeOverview)
    }

    // console.log('Weekly Matchup (App.js)',weeklyMatchup)
    // console.log('leagueStandings (App.js)',leagueStandings)
  return (
    <>
    <Router>
    <SiteHeader handleLeagueChange={handleLeagueChange}
                leagueData={handleLeagueOverivew}
     />
        {/*<WeekSelector onWeekChange={handleWeekChange}/>*/}
        <Routes>
          {/* League Routes */}
          <Route path="/gvl" element={<LeagueNav leagueStandings = {leagueStandings} />}>
            <Route path="" element={<LeagueHome leagueStandings = {leagueStandings}/>}/>
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/family" element={<LeagueNav weeklyMatchup = {weeklyMatchup} />} >
            <Route path="/family" element={<LeagueHome leagueStandings = {leagueStandings} />}/>
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/it" element={<LeagueNav weeklyMatchup = {weeklyMatchup} />} >
            <Route path="" element={<LeagueHome leagueStandings = {leagueStandings} />}/>
            <Route path="matchup" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />}/>
            <Route path="team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          </Route>
          <Route path="/hockey" element={<LeagueNav weeklyMatchup = {weeklyMatchup} />} >
            <Route path="" element={<LeagueHome leagueStandings = {leagueStandings} />}/>
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


