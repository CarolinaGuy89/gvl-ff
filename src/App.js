import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useCallback } from 'react';
import SiteHeader from './components/SiteHeader';
import Team from './pages/team';
import Draft from './pages/draft';
import WeeklyOverview from './pages/WeeklyOverview.js';
import Navbar from './components/navbar';
import { SelectWeek, calculateDefaultWeek } from './components/WeekSelect';
import { getBoxscoreForWeek } from './components/getAPIData';
import { WeekSelector } from './components/WeekSelect';

function App() {
    const [leagueId, setLeagueId] = useState(1248073066);
    const [weeklyMatchup, setWeeklyMatchup] = useState();
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);
    // Define a function to receive the value from the child component
    function handleLeagueIdChange(newLeagueId) {
      setLeagueId(newLeagueId);
    }

    function handleWeekChange(newWeekNum) {
      console.log('newWeekNum' + newWeekNum);
      setSelectedWeek(newWeekNum);
    }

    const fetchApiData = useCallback(async () => {
      try {
        const matchup = await getBoxscoreForWeek(leagueId, selectedWeek);
        setWeeklyMatchup(matchup);
        console.log("APP Weekly Matchup: ", matchup)
      } catch (error) {
        // Handle errors if necessary
        console.error('Error fetching data:', error);
      }
    }, [leagueId, selectedWeek]);

    useEffect(() => {
      fetchApiData();
      console.log('fetchApiData();')
    },[fetchApiData])

    // useEffect(() => {
    //   getBoxscoreForWeek(leagueId,selectedWeek).then((matchup) => {
    //     // console.log('matchup: ', matchup);
    //     setWeeklyMatchup(matchup);
    //   })}, [leagueId, selectedWeek]);//Request new Data at change of League or week

    console.log('Weekly Matchup (App.js)',weeklyMatchup)
  return (
    <>
    <SiteHeader onLeagueIdChange={handleLeagueIdChange} />
    <Router>
      <div>
        {<Navbar />}
        {<WeekSelector onWeekChange={handleWeekChange}/>}
        <Routes>
          {/* Route to the Team component */}
          <Route path="/" element={<WeeklyOverview weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/team" element={<Team weeklyMatchup = {weeklyMatchup} />} />
          <Route path="/draft" element={<Draft leagueId ={leagueId} />} />

          {/* Other routes can be added here */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;


