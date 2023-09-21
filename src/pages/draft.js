import React, { useState, useEffect } from 'react';
import family from '../components/data/draft/family-draft2023.json'
import gvl from '../components/data/draft/gvl-draft2023.json'
import work from '../components/data/draft/work-draft2023.json'
import Table from '../components/draftTable'

export default function Draft({ leagueId }) {
/*    const [draft, setDraft] = useState([]);
        useEffect(() => {
        if (leagueId === 'gvl') {
          setDraft(gvl);
        } else if (leagueId === 'family') {
          setDraft(family);
        } else if (leagueId === 'work') {
          setDraft(work);
        }
      }, [leagueId]);
    
*/
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
  }