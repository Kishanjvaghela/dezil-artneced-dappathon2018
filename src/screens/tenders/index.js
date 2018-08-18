import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DataBase from '../../database';
import { getTenderDetails } from '../../interact';

class Tenders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenders: []
    };
  }
  componentDidMount() {
    const p = DataBase.getTenders();
    // const tableData = [];
    if (p) {
      const allPromise = Object.values(p).map(tender =>
        getTenderDetails(tender)
      );
      Promise.all(allPromise)
        .then(data => {
          // tableData.push(data);
          console.log(data);
          this.setState({ tenders: data });
        })
        .catch(e => console.error(e));
    }
  }
  render() {
    const columns = [
      {
        Header: 'Tender ID',
        accessor: 'tenderid'
      },
      {
        Header: 'Amount',
        accessor: 'tenderAmount'
      },
      {
        Header: 'Type',
        accessor: 'tendertype'
      },
      {
        Header: 'filtertype',
        accessor: 'filtertype'
      }
    ];
    return (
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Tenders</h1>
          {/* <p>{JSON.stringify(DataBase.getTenders())}</p> */}
          <ReactTable data={this.state.tenders} columns={columns} />
        </div>
      </div>
    );
  }
}

export default Tenders;
