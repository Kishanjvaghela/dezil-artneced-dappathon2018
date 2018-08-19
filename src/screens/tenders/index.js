import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'react-table/react-table.css';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import DataBase from '../../database';
import {
  getTenderDetails,
  closeTender,
  updateStatus,
  getBidDetails
} from '../../Admin';
import { submitBid } from '../../Agents';

class Tenders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenders: [],
      show: false,
      viewTender: null,
      bidAmount: 0,
      duration: 0,
      address: ''
    };
    this.toggle = this.toggle.bind(this);
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

  closeTenderClick = address => {
    console.log(address);

    closeTender(address)
      .then(data => {
        this.handleClose();
        alert('Success');
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  updateStatusClick = (address, tender) => {
    updateStatus(address, tender.id, tender.status, '10', '0x1')
      .then(() => {
        alert('Seccess');
      })
      .catch(() => {});
  };

  submitBidClick = address => {
    console.log('submit bid clicked');
    this.setState({ show: true, address });
  };
  handleClose = () => {
    this.setState({
      show: false,
      viewTender: null,
      address: '',
      tenderAddress: ''
    });
  };

  renderAlert() {
    return (
      <div>
        <Label for="title">Bid Amount</Label>
        <input />
      </div>
    );
  }
  toggle() {
    this.setState({
      show: !this.state.show,
      address: ''
    });
  }

  getDetails = tender => {
    console.log(tender);
    getBidDetails(tender.tenderAddress)
      .then(data => {
        // alert(JSON.stringify(data));
        console.log(data);
        this.setState({
          viewTender: data,
          tenderAddress: tender.tenderAddress
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderContractor = contractors => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Tender Type</TableCell>
            <TableCell>Bid Amount</TableCell>
            <TableCell>Bids Won</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contractors.map(row => {
            return (
              <TableRow key={row.contractid}>
                <TableCell component="th" scope="row">
                  {row.contractid}
                </TableCell>
                <TableCell>{row.tendertype.toString()}</TableCell>
                <TableCell>{row.bidamount.toString()}</TableCell>
                <TableCell>{row.bidswon.toString()}</TableCell>
                <TableCell>{row.duration.toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };
  viewTender = () => {
    const { viewTender } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!this.state.viewTender}
        style={{
          margin: 250,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
        onClose={this.handleClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: 10,
            alignSelf: 'center'
          }}
        >
          {this.state.viewTender &&
            this.renderContractor(this.state.viewTender)}

          <div style={{ margin: 10 }}>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                const { tenderAddress } = this.state;
                this.closeTenderClick(tenderAddress);
              }}
            >
              Finalize
            </Button>
            <Button onClick={this.handleClose}>Close</Button>
          </div>
        </div>
      </Modal>
    );
  };

  renderSubmitModel = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.show}
        style={{
          margin: 250,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
        onClose={this.handleClose}
      >
        <Form
          style={{
            backgroundColor: 'white',
            padding: 10,
            alignSelf: 'center'
          }}
        >
          <FormGroup>
            <Label for="tenderAmount">Amount</Label>
            <Input
              id="tenderAmount"
              placeholder="Enter tender amount"
              value={this.state.bidAmount}
              onChange={evt => {
                return this.setState({ bidAmount: evt.target.value });
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
          <Button
            onClick={() => {
              const { address, bidAmount, duration } = this.state;
              console.log(this.props.user);
              submitBid(
                address,
                parseInt(bidAmount),
                this.props.user.userId,
                'tendertype',
                10,
                parseInt(duration)
              )
                .then(data => {
                  const newBids = this.state.tenders.map(bid => {
                    if (bid.tenderAddress === address) {
                      bid.status = 2;
                      alert(JSON.stringify(bid));
                    }
                    return bid;
                  });
                  this.setState({
                    show: false,
                    tenders: JSON.parse(JSON.stringify(newBids))
                  });
                })
                .catch(error => {
                  alert(JSON.stringify(error));
                });
            }}
          >
            Pitch
          </Button>{' '}
          {'    '}
          <Button
            onClick={() => {
              this.setState({ show: false });
            }}
          >
            Close
          </Button>
        </Form>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        {this.renderSubmitModel()}
        {this.viewTender()}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tender title</TableCell>
                <TableCell>Tender Category</TableCell>
                <TableCell>Filter Type</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Duration (In month)</TableCell>
                {!this.props.dashboard && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tenders.map(row => {
                return (
                  <TableRow key={row.tenderAddress}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.tenderCategory}</TableCell>
                    <TableCell>{row.filtertype}</TableCell>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell>{row.tenderAmount}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    {!this.props.dashboard && (
                      <TableCell>
                        <Button
                          color="danger"
                          onClick={() => {
                            if (this.props.user.type === 1) {
                              // this.closeTenderClick(row.tenderAddress);
                              this.getDetails(row);
                            } else {
                              this.submitBidClick(row.tenderAddress);
                            }
                          }}
                        >
                          <div>
                            {this.props.user.type === 1 ? 'View' : 'Pitch'}
                          </div>
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Tenders;
