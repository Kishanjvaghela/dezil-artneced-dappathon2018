import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-table/react-table.css';
import DataBase from '../../database';
import { getTenderDetails, closeTender, updateStatus } from '../../Admin';
import { submitBid } from '../../Agents';

class Tenders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenders: [],
      show: false,
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

  render() {
    const columns = [
      {
        Header: 'Tender title',
        accessor: 'title'
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
      },
      {
        Header: 'Action',
        accessor: 'tenderAddress',
        Cell: props => {
          const tender = this.state.tenders.find(
            k => k.tenderAddress === props.value
          );
          return (
            <Button
              color="danger"
              onClick={() => {
                const tenderLocal = this.state.tenders.find(
                  k => k.tenderAddress === props.value
                );
                console.log(tenderLocal);

                if (this.props.user.type === 1) {
                  this.closeTenderClick(props.value);
                } else {
                  if (tenderLocal && tender.state === 1) {
                    this.submitBidClick(props.value);
                  } else if (tender && tender.state === 2) {
                    this.updateStatusClick(props.value, tender);
                  } else {
                    this.submitBidClick(props.value);
                  }
                }
              }}
            >
              <div>
                {this.props.user.type === 1
                  ? 'Close'
                  : tender && tender.status === 2
                    ? 'Update'
                    : 'Pich'}
              </div>
            </Button>
          );
        }
      }
    ];
    return (
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Tenders</h1>
          <div>
            <ReactModal isOpen={this.state.show}>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    disabled
                    id="title"
                    placeholder="Enter tender title"
                    value={this.state.title}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tenderCategory">Tender Category</Label>
                  <Input
                    disabled
                    type="select"
                    name="select"
                    id="tenderCategory"
                  >
                    <option>Manufacturing</option>
                    <option>IT service</option>
                    <option>Schools</option>
                    <option>Restaurant</option>
                    <option>Others</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="desc">Description</Label>
                  <Input
                    disabled
                    id="desc"
                    placeholder="Enter tender description"
                    value={this.state.desc}
                  />
                </FormGroup>
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
                  Pich
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
            </ReactModal>
          </div>
          <ReactTable data={this.state.tenders} columns={columns} />
        </div>
      </div>
    );
  }
}

export default Tenders;
