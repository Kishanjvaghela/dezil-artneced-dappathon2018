import { PerformanceObserver } from 'perf_hooks';

//connect to the local host(gaancahe)
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const Tender = require('../build/contracts/Tender.json');

const bytecode = Tender.bytecode;
const abi = Tender.abi;
var tenderContract = web3.eth.contract(abi);

const submitBid = (tenderAddress, bidamount, contractid, tendertype, bidswon, duration) => {
    return new Promise((resolve, reject) => {
        let contractInstance = tenderContract.at(tenderAddress);
        contractInstance.submitBid(bidamount, contractid, tendertype, bidswon, duration, { from: web3.eth.accounts[1], gas: '4700000' }, function (err, data) {
            if (err) {
                return reject(err)
            } else {
                return resolve(data)
            }
        })
    })
}

const updateStatus = (tenderAddress, tenderid, tenderstatus, percent, verifier) => {
    return new Promise((resolve, reject) => {
        let contractInstance = tenderContract.at(tenderAddress);
        contractInstance.updateStatus(tenderid, tenderstatus, percent, verifier, { from: web3.eth.accounts[1], gas: '4700000' }, function (err, data) {
            if (err) {
                return reject(err)
            } else {
                return resolve(data)
            }
        })
    })
}

const tenderStatus = (tenderAddress, tenderid) => {
    return new Promise((resolve, reject) => {
        let contractInstance = tenderContract.at(tenderAddress);
        contractInstance.getTenderStatus(tenderid, { from: web3.eth.accounts[1], gas: '4700000' }, function (err, data) {
            if (err) {
                return reject(err)
            } else {
                return resolve(data)
            }
        })
    })
}

export { submitBid, updateStatus, tenderStatus };