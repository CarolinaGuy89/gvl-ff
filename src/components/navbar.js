import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import logo from '../../images/field-logo.png'
export default function Navbar() {
    const [menuVis, setMenuVis] = useState("false")
    const [page, setPage] = useState('home')

    function changePage(newPage) {
        if(menuVis === 'true') {
            setMenuVis('false')
        }
        setPage(newPage)
    }

return(
    <>
    <div className="topnav">
    <Link to="/" onClick={() => changePage("home")}
            className={page === 'home' ? 'selected' : ''}>Weekly Matchups</Link>

    <Link to="/team" onClick={() => changePage("team")}
            className={page === 'team' ? 'selected' : ''}>Team Overview</Link>
    
    <Link to="/draft" onClick={() => changePage("draft")}
        className={page === 'draft' ? 'selected' : ''}>Draft</Link>
    </div>
    </>
    )
}
/*
    <Link to="/draftPick" onClick={() => changePage("draftPick")}
        className={page === 'draftPick' ? 'selected' : ''}>Live Draft</Link>
*/