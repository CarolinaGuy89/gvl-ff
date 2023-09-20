import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
//import logo from '../../images/field-logo.png'
export default function Navbar() {
    const [menuVis, setMenuVis] = useState("false")
    const [page, setPage] = useState('')

    function changePage(newPage) {
        if(menuVis === 'true') {
            setMenuVis('false')
        }
        setPage(newPage)
    }
/*
    // Use useEffect to select the first button on page load/*
    useEffect(() => {
        changeLeague(selectedButton);
    }, []); // Empty dependency array ensures this effect runs once on moun
    */

return(
    <>
    <div className="topnav">
        <Link to="/" onClick={() => changePage("home")}
            className={page === '/' ? 'selected' : ''}>Home</Link>

    <Link to="/team" onClick={() => changePage("team")}
            className={page === 'team' ? 'selected' : ''}>Team Overview</Link>
    
    <Link to="/draft" onClick={() => changePage("draft")}
        className={page === 'draft' ? 'selected' : ''}>Draft Results</Link>

    <Link to="/draftPick" onClick={() => changePage("draftPick")}
        className={page === 'draftPick' ? 'selected' : ''}>Live Draft</Link>
    </div>
    </>
    )
}

/*
    <div class="topnav">
        <Link href="/">Home</Link>
        <Link class="active" href="/team">Team Overview</Link>
        <Link href="/draft">Draft Results</Link>
        <Link href="/pickDraft"><i>Live Draft</i></Link>
    </div>
*/

/*
        <nav>
          <ul>
            <li>
              <Link to="/team">Go to Team</Link>
            </li>
            <li>
              <Link to="/draft">Go to Draft</Link> {/* Add the link for Draft *}
              </li>
              </ul>
            </nav>
*/