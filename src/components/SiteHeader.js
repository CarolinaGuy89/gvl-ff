import '../App.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoxscoreForWeek, getDraftData, getTeamsForWeek } from './getAPIData';
import { calculateDefaultWeek } from './WeekSelect';
import { Outlet } from 'react-router-dom';
import { WeekSelector } from './WeekSelect';

function SiteHeader({ handleLeagueChange, leagueData }) {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState();
  const [selectedLeague, setSelectedLeague] = useState();
  const [leagueId, setLeagueId] = useState();
  const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);
  const [page, setPage] = useState()

  function handleWeekChange(newWeek) {
    setSelectedWeek(newWeek);
  }

  useEffect(() => {
    //Don't requst API data unless leagueId is set
    if (typeof leagueId == 'number') {
      getBoxscoreForWeek(leagueId, selectedWeek).then((matchup) => {
        handleLeagueChange(matchup);
      })
    }
  }, [leagueId, selectedWeek]);//Request new Data at change of League or week  

  useEffect(() => {
    //Don't requst API data unless leagueId is set
    if (typeof leagueId == 'number') {
      getTeamsForWeek(leagueId, selectedWeek).then((teamData) => {
        leagueData(teamData);
      })
    }
  }, [leagueId, selectedWeek]);//Request new Data at change of League or week  

  useEffect(() => {
    //Don't requst API data unless leagueId is set
    if (typeof leagueId == 'number') {
      getDraftData(leagueId).then((draftData) => {
        console.log('draftData, ', draftData)
      })
    }
  }, [leagueId]);//Request new Data at change of League or week  

  function changeLeague(selectedLeague) {
    switch (selectedLeague) {
      case "gvl"://a.in This text is code internal
        setPageTitle("G-Vegas Fantasy Football");
        navigate('/gvl'); // This text display in URL Bar
        setLeagueId(1248073066);
        break
      case "family":
        setPageTitle("The League of Family Drama");
        navigate('/family');
        setLeagueId(283159008);
        break
      case "work":
        setPageTitle("Logistically, IT's Complicated");
        navigate('/it');
        setLeagueId(601844230);
        break
      case "hockey":
        setPageTitle("Full Contact Turf Hockey");
        navigate('/hockey');
        setLeagueId(1335739020);
        break
      default:
        setPageTitle("GVL Fantasy Football Stats");
        break;
    }
  }


  // Use useEffect to select the first button on page load
  useEffect(() => {
    changeLeague(selectedLeague);
  }, [selectedLeague]); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <section className='SiteHeader'>
        <div class="title-week-container">
          <div className='title-container'>
            <h1 className="pageTitle">{pageTitle}</h1>
          </div>
          <div className='week-container'>
            <WeekSelector onWeekChange={handleWeekChange} />
          </div>
        </div>
        <div className="league-bar">
          <button onClick={() => {setSelectedLeague('gvl');//a.out This text is code internal
          }} className={selectedLeague === 'gvl' ? 'selected' : ''}>G-Vegas</button>

          <button onClick={() => {setSelectedLeague('family');
          }} className={selectedLeague === 'family' ? 'selected' : ''}>League of Family Drama</button>

          <button onClick={() => {setSelectedLeague('work');
          }} className={selectedLeague === 'work' ? 'selected' : ''}>Logistically, IT&apos;s complicated</button>
          
          <button onClick={() => {setSelectedLeague('hockey');
          }} className={selectedLeague === 'hockey' ? 'selected' : ''}>Turf Hockey</button>
        </div>
      </section>

    </>
  );
}

export default SiteHeader;