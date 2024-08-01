import React, { useState } from 'react';

//Calculate the current week
export function calculateDefaultWeek() {

    const currentDate = new Date();
    const startOfWeek1 = new Date('2024-09-05'); // Thursday of NFL Week one
    const millisecondsInAWeek = 604800000;
    var weeksSinceStart = Math.floor((currentDate - startOfWeek1) / millisecondsInAWeek);

    if (weeksSinceStart < 0) {
      weeksSinceStart = 0;
    }
    
    // Ensure the week number is between 0 and 17 (or your season's max week)
    // 0 = Preseason
    //return Math.min(Math.max(weeksSinceStart + 1, 1), 17);
    return Math.min(Math.max(weeksSinceStart, 0), 18);
}


  // Function to handle dropdown selection change
  // const handleWeekChange = (event) => {
  //   setSelectedWeek(parseInt(event.target.value, 10));
  // };


export function WeekSelector({ onWeekChange }) {
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek());

    // Define the length of the season, from week 1 to 17. Single week playoffs
    const weekNumbers = Array.from({ length: 18 }, (_, index) => index);

    // Function to handle dropdown selection change
    const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value, 10));
    onWeekChange(Number(event.target.value));
    //console.log('WeekSelect.js handleWeekChange '+event.target.value)
    };

return(
<>
    <div className='selectWeek'>
    <select className="weekDropdownBox" onChange={handleWeekChange} value={selectedWeek}>
      {weekNumbers.map((weekNumber) => (
        <option key={weekNumber} value={weekNumber}>Week #{weekNumber}</option>
      ))}
    </select>
    </div>
</>
)}