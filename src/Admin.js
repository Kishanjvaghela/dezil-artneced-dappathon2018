//connect to the local host(gaancahe)
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const Tender = require('../build/contracts/Tender.json');

const bytecode = Tender.bytecode;
const abi = Tender.abi;
var tenderContract = web3.eth.contract(abi);

const createTender = (
  tenderid,
  title,
  tenderCategory,
  filtertype,
  tenderamount,
  desc,
  duration
) => {
  return new Promise((resolve, reject) => {
    var tender = tenderContract.new(
      tenderid,
      title,
      tenderCategory,
      filtertype,
      tenderamount,
      desc,
      duration,
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
    console.log(tenderAddress);
    let contractInstance = tenderContract.at(tenderAddress);
    contractInstance.getTenderDetails({ from: web3.eth.accounts[0] }, function(
      err,
      data
    ) {
      // TODO :web3.eth.accounts[0] shoud be configurable
      console.log(data);
      console.log(err);

      if (err) {
        return reject(err);
      } else {
        return resolve({
          tenderAddress,
          tenderid: data[0],
          title: data[1],
          tenderCategory: data[2],
          filtertype: data[3],
          desc: data[4],
          admin: data[5],
          tenderAmount: data[6].toString(),
          duration: data[7].toString()
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
