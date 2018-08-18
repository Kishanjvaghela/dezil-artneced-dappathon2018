import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DataBase from '../../database';
import { getTenderDetails } from '../../Admin';

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
        Header: 'Tender title',
        accessor: 'title'
      },
      {
        Header: 'Amount',
        accessor: 'tenderAmount'
      },
      {
        Header: 'Tender Category',
        accessor: 'tenderCategory'
      },
      {
        Header: 'filtertype',
        accessor: 'filtertype'
      },
      {
        Header: 'Desc',
        accessor: 'desc'
      },
      {
        Header: 'Amount',
        accessor: 'tenderAmount'
      },
      {
        Header: 'Duration (In month)',
        accessor: 'duration'
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
