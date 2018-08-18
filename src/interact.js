//connect to the local host(gaancahe)
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const Tender = require('../build/contracts/Tender.json');

const bytecode = Tender.bytecode
const abi = Tender.abi

function createTender(tenderid,tendertype,filtertype,tenderamount) {
    var tenderContract = web3.eth.contract(abi);
    var tender = tenderContract.new(tenderid,tendertype,filtertype,tenderamount,
        {
            from: web3.eth.accounts[0],
            data: bytecode,
            gas: '4700000'
        }, function (e, contract) {
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        })
}

createTender("QT180000000014490","work","amount",100000000)

