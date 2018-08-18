import React from 'react';
import DataBase from '../../database';

const Tenders = () => {
  return (
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Tenders</h1>
        <p>{JSON.stringify(DataBase.getTenders())}</p>
      </div>
    </div>
  );
};

export default Tenders;
