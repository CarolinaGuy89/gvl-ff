import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function LeagueHome() {
  const [selectedPage, setSelectedPage] = useState('matchup')


  return (
    <>
      <div className="pageSelectBar">
        <nav>
          <Link to="matchup" onClick={() => setSelectedPage("matchup")}
            className={selectedPage === 'matchup' ? 'selected' : ''}>Weekly Matchups</Link>

          <Link to="team" onClick={() => setSelectedPage("team")}
            className={selectedPage === 'team' ? 'selected' : ''}>Team Overview</Link>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

/*
        <Link to="draft" onClick={() => setSelectedPage("draft")}
          className={selectedPage === 'draft' ? 'selected' : ''}>Draft</Link>
*/