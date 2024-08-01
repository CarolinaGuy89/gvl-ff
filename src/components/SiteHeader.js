//import '../App.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoxscoreForWeek, getDraftData, getTeamsForWeek } from './getAPIData';
import { calculateDefaultWeek } from './WeekSelect';
import { WeekSelector } from './WeekSelect';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

function SiteHeader({ handleLeagueChange, leagueData }) {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState();
  const [selectedLeague, setSelectedLeague] = useState();
  const [leagueId, setLeagueId] = useState();
  const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);
  const [show, setShow] = useState(false);

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
        handleClose();
        break
      case "family":
        setPageTitle("The League of Family Drama");
        navigate('/family');
        setLeagueId(283159008);
        handleClose();
        break
      case "work":
        setPageTitle("Logistically, IT's Complicated");
        navigate('/it');
        setLeagueId(601844230);
        handleClose();
        break
      case "hockey":
        setPageTitle("Full Contact Turf Hockey");
        navigate('/hockey');
        setLeagueId(1335739020);
        handleClose();
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



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <section className='SiteHeader'>

          <div className='title-container'>
            <h1 className="pageTitle">{pageTitle}</h1>
          </div>

        <div className="league-bar">
          <Button variant="primary" onClick={handleShow}>Leagues &#9776;</Button>
          <Offcanvas show={show} placement='end' onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Change current league:</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link onClick={() => {setSelectedLeague('gvl');}}>G-Vegas</Nav.Link>
                <Nav.Link onClick={() => {setSelectedLeague('family');}}>League of Family Drama</Nav.Link>
                <Nav.Link onClick={() => {setSelectedLeague('work');}}>Logistically, IT&apos;s complicated</Nav.Link>
                <Nav.Link onClick={() => { setSelectedLeague('hockey'); }}>Full Contact Turf Hockey</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          <div className='week-container'>
            <WeekSelector onWeekChange={handleWeekChange} />
          </div>
        </div>
      </section>

    </>
  );
}

export default SiteHeader;

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change League &#9776;
      </Button>

      <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Change Leauge</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}