//import {determineOwner} from '../components/teamowners'
import React from 'react';
//import { Link } from 'react-router-dom';
//import { Client } from "espn-fantasy-football-api/node-dev.js";
//import { leagueData } from './api/functions.js'

export default function MyTeam({ leagueId }) {
 /*   const [season, setSeason] = useState(2023);
    const [manager, setManager] = useState(determineOwner(1248073066,1));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [league, setLeague] = useState();
    //const [isMenuOpen, setIsMenuOpen] = useState();
    //leagueData(season)

    function getData() {
        setManager(determineOwner(1248073066,2))
    }
    
    function IconDropdown() {

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
      const closeMenu = () => {
        setIsMenuOpen(false);
      };
    }
      

  function changeLeague(_) {
    setLeague(_)
    console.log("Called")
  };*/

  return (
    <>  
        <div>
            <h2 style={{textAlign: "center", color:"white", fontSize:"48px"}}>
            This is Simon:
            👷
            </h2>
            <h3 style={{textAlign: "center", color:"white"}}>
            Simon doesn't work very fast.
            
            </h3>

            <p style={{textAlign: "center", color:"white"}}> <br/>He will finish this page eventually...</p>
        </div>
    </>
    )
/*
    return (
    <>
    
    <h1>{leagueId}</h1>
    <div><button onClick={getData}>Like ({manager})</button></div>
    <button onClick={() => changeLeague("someValue")}>Icon {league}</button>
    
    </>
    )*/
  }