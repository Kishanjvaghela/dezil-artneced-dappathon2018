import React from 'react';
import { Pie } from 'react-chartjs';

const pieData = [
  {
    value: 300,
    color: '#F7464A',
    highlight: '#FF5A5E',
    label: 'Red'
  },
  {
    value: 50,
    color: '#46BFBD',
    highlight: '#5AD3D1',
    label: 'Green'
  },
  {
    value: 100,
    color: '#FDB45C',
    highlight: '#FFC870',
    label: 'Yellow'
  }
];
const Dashboard = () => {
  return (
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <div>
          <Pie data={pieData} />
          <Pie data={pieData} />
          <Pie data={pieData} />
        </div>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 59</strong> of App.js.
        </p>
        <p>The stored value is: </p>
      </div>
    </div>
  );
};

export default Dashboard;
