import '../App.css'
import React, { useState, useEffect  } from 'react';
import handleChangeLeagueId from '../App'

function SiteHeader({ onLeagueIdChange }) {
    const [league, setLeague] = useState();
    const [pageTitle, setPageTitle] = useState();
    const [selectedButton, setSelectedButton] = useState('gvl');
  
    function changeLeague(_) {
      switch (_){
        case "gvl":
          setPageTitle("G-Vegas Fantasy Football");
          onLeagueIdChange(1248073066);
          break
        case "family":
          setPageTitle("The League of Family Drama");
          onLeagueIdChange(283159008);
          break
        case "work":
          setPageTitle("Logistically, IT's Complicated");
          onLeagueIdChange(601844230);
          break
        case "hockey":
          setPageTitle("Turf Hockey Fantasy Football");
          onLeagueIdChange('hockey');
          break
      }
    }

      // Use useEffect to select the first button on page load
  useEffect(() => {
    changeLeague(selectedButton);
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
    <h1 className="siteHeader">{pageTitle}</h1>
    <div className="league-bar">
        <button onClick={() => {
            changeLeague("gvl");
            setSelectedButton('gvl');
            }}
            className={selectedButton === 'gvl' ? 'selected' : ''}>G-Vegas</button>

        <button style={{ fontSize: "16px"}} onClick={() => {
            changeLeague("family");
            setSelectedButton('family');
            }}
            className={selectedButton === 'family' ? 'selected' : ''}>League of Family Drama</button>

        <button style={{ fontSize: "16px"}} onClick={() => {
            changeLeague("work");
            setSelectedButton('work');
            }}
            className={selectedButton === 'work' ? 'selected' : ''}>Logistically, IT&apos;s complicated</button>

        <button style={{ fontSize: "16px"}} onClick={() => {
            changeLeague("hockey");
            setSelectedButton('hockey');
            }}
            className={selectedButton === 'hockey' ? 'selected' : ''}>Full Contact Turf Hockey</button>
    </div>
    </>
  );
}

export default SiteHeader;
