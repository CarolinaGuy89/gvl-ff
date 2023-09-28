import React, { useState } from 'react';

//Calculate the current week
export function calculateDefaultWeek() {

    const currentDate = new Date();
    const startOfWeek1 = new Date('2023-09-07'); // Thursday of NFL Week one
    const millisecondsInAWeek = 604800000;
    const weeksSinceStart = Math.floor((currentDate - startOfWeek1) / millisecondsInAWeek);
    
    // Ensure the week number is between 1 and 17 (or your season's max week)
    return Math.min(Math.max(weeksSinceStart + 1, 1), 17);
}


  // Function to handle dropdown selection change
  // const handleWeekChange = (event) => {
  //   setSelectedWeek(parseInt(event.target.value, 10));
  // };


export function WeekSelector({ onWeekChange }) {
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek());

    // Define the length of the season, from week 1 to 17. Single week playoffs
    const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);

    // Function to handle dropdown selection change
    const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value, 10));
    onWeekChange(Number(event.target.value));
    //console.log('WeekSelect.js handleWeekChange '+event.target.value)
    };

return(
<>
    <div className='selectWeek'>
    <label className="weekDropdownTitle">Select Week:  </label>
    <select className="weekDropdownBox" onChange={handleWeekChange} value={selectedWeek}>
      {console.log(selectedWeek)}
      {weekNumbers.map((weekNumber) => (
        <option key={weekNumber} value={weekNumber}>Week #{weekNumber}</option>
      ))}
    </select>
    </div>
</>
)}