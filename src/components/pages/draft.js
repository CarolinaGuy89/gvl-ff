import React, { useState, useEffect } from 'react';
import family from '../components/data/draft/family-draft2023.json'
import gvl from '../components/data/draft/gvl-draft2023.json'
import work from '../components/data/draft/work-draft2023.json'
import Table from '../components/draftTable'

export default function draft({ leagueId }) {
    const [draft, setDraft] = useState([]);
    
    console.log(leagueId);
    useEffect(() => {
        if (leagueId === 'gvl') {
          setDraft(gvl);
        } else if (leagueId === 'family') {
          setDraft(family);
        } else if (leagueId === 'work') {
          setDraft(work);
        }
      }, [leagueId]);
    

    return (
    <> 
        <div>
            <h2>
                <i>Coming for the 2023 season {leagueId}.</i>
            </h2>
            <Table data = {draft} />
            {/*<p>{draft.length > 0 ? draft[0].manager : 'Loading...'}</p>*/}
        </div>
    </>
    )
  }