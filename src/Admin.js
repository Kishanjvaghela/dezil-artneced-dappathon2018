//connect to the local host(gaancahe)
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const Tender = require('../build/contracts/Tender.json');

const bytecode = Tender.bytecode;
const abi = Tender.abi;
var tenderContract = web3.eth.contract(abi);

const createTender = (tenderid, tendertype, filtertype, tenderamount) => {
  return new Promise((resolve, reject) => {
    var tender = tenderContract.new(
      tenderid,
      tendertype,
      filtertype,
      tenderamount,
      {
        from: web3.eth.accounts[0],
        data: bytecode,
        gas: '4700000'
      },
      function(e, contract) {
        if (e) {
          return reject(e);
        }
        if (typeof contract.address !== 'undefined') {
          console.log(
            'Contract mined! address: ' +
              contract.address +
              ' transactionHash: ' +
              contract.transactionHash
          );
          return resolve({
            address: contract.address,
            txHash: contract.transactionHash
          });
        }
      }
    );
  });
};

const getTenderDetails = tenderAddress => {
  return new Promise((resolve, reject) => {
    let contractInstance = tenderContract.at(tenderAddress);
    contractInstance.getTenderDetails({ from: web3.eth.accounts[0] }, function(
      err,
      data
    ) {
      // TODO :web3.eth.accounts[0] shoud be configurable
      if (err) {
        return reject(err);
      } else {
        return resolve({
          tenderid: data[0],
          tenderAmount: data[1].toNumber(),
          tendertype: data[2],
          admin: data[3],
          filtertype: data[4]
        });
      }
    });
  });
};

const closeTender = tenderAddress => {
  return new Promise((resolve, reject) => {
    let contractInstance = tenderContract.at(tenderAddress);
    var filtertype;
    contractInstance.getTenderDetails({ from: web3.eth.accounts[0] }, function(
      err,
      data
    ) {
      if (err) {
        return reject(err);
      } else {
        if (filtertype === 'amount') {
          contractInstance.revealbyAmount(
            { from: web3.eth.accounts[0] },
            function(err, data) {
              if (err) {
                return reject('There are no bids submitted yet');
              } else {
                return resolve(data);
              }
            }
          );
        } else {
          contractInstance.revealbyDuration(
            { from: web3.eth.accounts[0] },
            function(err, data) {
              if (err) {
                return reject('There are no bids submitted yet');
              } else {
                return resolve(data);
              }
            }
          );
        }
      }
    });
  });
};

export { createTender, getTenderDetails, closeTender };
