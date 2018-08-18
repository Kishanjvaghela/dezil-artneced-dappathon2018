import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import _ from 'lodash';
import { createTender } from '../../Admin';
import DataBase from '../../database';
class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tenderCategory: '',
      filterType: '',
      amount: '',
      desc: '',
      duration: ''
    };
  }

  createTender = event => {
    event.preventDefault();
    // alert(JSON.stringify(this.state));
    const {
      title,
      tenderCategory,
      amount,
      filterType,
      desc,
      duration
    } = this.state;
    const tenderId = _.uniqueId() + new Date().getTime().toString();
    // alert(JSON.stringify(this.state));
    createTender(
      tenderId,
      title,
      tenderCategory,
      filterType,
      parseInt(amount),
      desc,
      parseInt(duration)
    )
      .then(data => {
        DataBase.createTender(tenderId, data.address);
        alert(data.txHash);
      })
      .catch(e => alert(e.toString()));
  };
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-1" style={{ flexDirection: 'column' }}>
          <Form
            onSubmit={e => {
              this.createTender(e);
            }}
          >
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter tender title"
                value={this.state.title}
                onChange={evt => {
                  return this.setState({ title: evt.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="tenderCategory">Tender Category</Label>
              <Input
                type="select"
                name="select"
                id="tenderCategory"
                onChange={evt => {
                  return this.setState({ tenderCategory: evt.target.value });
                }}
              >
                <option>Manufacturing</option>
                <option>IT service</option>
                <option>Schools</option>
                <option>Restaurant</option>
                <option>Others</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="tenderAmount">Amount</Label>
              <Input
                id="tenderAmount"
                placeholder="Enter tender amount"
                value={this.state.amount}
                onChange={evt => {
                  return this.setState({ amount: evt.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                id="desc"
                placeholder="Enter tender description"
                value={this.state.desc}
                onChange={evt => {
                  return this.setState({ desc: evt.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Duration</Label>
              <Input
                id="desc"
                placeholder="Enter tender duration in month"
                value={this.state.duration}
                onChange={evt => {
                  return this.setState({ duration: evt.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="filterType">Filter Type</Label>
              <Input
                type="select"
                name="select"
                id="filterType"
                onChange={evt => {
                  return this.setState({ filterType: evt.target.value });
                }}
              >
                <option>Amount</option>
                <option>Duration</option>
              </Input>
            </FormGroup>
            <Button>Create Tender</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default CreateScreen;
