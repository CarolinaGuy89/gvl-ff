import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeagueNav({weeklyMatchup}) {
  const [selectedPage, setSelectedPage] = useState("")

  useEffect (() => {
    setSelectedPage("")
  }, [weeklyMatchup]);

  return (
    <>
      <div className="pageSelectBar">
        <nav>
        <Link to="" onClick={() => setSelectedPage("")}
            className={selectedPage === '' ? 'selected' : ''}>Home</Link>

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