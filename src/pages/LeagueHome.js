import { Link, Outlet } from 'react-router-dom';

export default function LeagueHome() {

    return (
        <>
      <div className="pageSelectBar">
        <nav>
        <Link to="overview">Weekly Matchups</Link>
        <Link to="team">Team Overview</Link>
        <Link to="draft">Draft</Link>
      </nav>
      </div>
      <Outlet />
        </>
    )
}