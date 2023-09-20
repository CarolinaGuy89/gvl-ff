import React from 'react';

const tableCellCss = {
  color: 'rgb(187, 255, 178)',
  borderRadius: '5px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  width: '100%', 
  borderBottom: '1px outset',
  padding: '3px',
  marginRight: 'aut',
  tableLayout: "fixed"
};


function InnerTable({ teamId, teamData }) {
  return (
    <table>
      <thead>
        <tr>
          <th style={{paddingBottom: '10px', font:'bold'}}colSpan="2">{teamId}</th>
        </tr>
      </thead>
      <tbody>
        {teamData.map((item) => (
          <tr key={item.id}>
            <td style={tableCellCss}>{item.roundId}</td>
            <td style={tableCellCss}>{item.playerFullName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function OuterTable({ groupedData }) {
  const outerTable = [];

  for (const teamId in groupedData) {
    if (groupedData.hasOwnProperty(teamId)) {
      const teamData = groupedData[teamId];
      outerTable.push(
        <td key={teamId}>
          <InnerTable teamId={teamId} teamData={teamData} />
        </td>
      );
    }
  }
  let x = outerTable.length/2;
  return (
    <table>
      <tbody>
        <tr>{outerTable.slice(0, x)}</tr>
        <tr>{outerTable.slice(x)}</tr>
      </tbody>
    </table>
  );
}

function App({ data }) {
  const groupedData = {};
  data.forEach((item) => {
    const teamId = item.teamId;
    if (!groupedData[teamId]) {
      groupedData[teamId] = [];
    }
    groupedData[teamId].push(item);
  });
  return (
    <div>
      <OuterTable groupedData={groupedData} />
    </div>
  );
}

export default App;
