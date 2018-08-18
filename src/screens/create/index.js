import React, { Component } from 'react';
import { createTender } from '../../interact';
import DataBase from '../../database';
class CreateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      number: '',
      taxType: '',
      amount: '',
      filterType: ''
    };
  }

  createTender = () => {
    // alert(JSON.stringify(this.state));
    const { title, number, taxType, amount, filterType } = this.state;
    createTender(number, taxType, filterType, amount)
      .then(data => {
        DataBase.createTender(number, data);
        alert(data);
      })
      .catch(e => alert(e.toString()));
  };
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-1" style={{ flexDirection: 'column' }}>
          <p>Title</p>
          <input
            value={this.state.title}
            onChange={evt => {
              return this.setState({ title: evt.target.value });
            }}
          />
          <p>Number</p>
          <input
            value={this.state.number}
            onChange={evt => {
              return this.setState({ number: evt.target.value });
            }}
          />
          <p>Taxation Type</p>
          <input
            value={this.state.taxType}
            onChange={evt => {
              return this.setState({ taxType: evt.target.value });
            }}
          />
          <p>Amount</p>
          <input
            value={this.state.amount}
            onChange={evt => {
              return this.setState({ amount: evt.target.value });
            }}
          />
          <p>Filter Type</p>
          <input
            value={this.state.filterType}
            onChange={evt => {
              return this.setState({ filterType: evt.target.value });
            }}
          />
          <p />
          <button onClick={this.createTender}>Create Tender</button>
        </div>
      </div>
    );
  }
}
export default CreateScreen;
