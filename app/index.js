const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    // Don't lose an existing provider, like Mist or Metamask
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const fs = require("fs");
const contents = fs.readFileSync("./build/contract/Splitter.json");

// Your deployed address changes every time you deploy.
const splitterAddress = "TODO: fill address"; // <-- Put your own
const splitterContractFactory = web3.eth.contract(JSON.parse(contents.abi));
const splitterInstance = splitterContractFactory.at(splitterAddress);

function split() {
    const targetAccount1 = document.getElementById("FirstAccount").value;
    const targetAccount2 = document.getElementById("SecondAccount").value;
    splitterInstance.split(
        targetAccount1, targetAccount2, {},
        function(err, txn) {
            if (err) {
                console.error(err);
            } else {
                console.log("split txn: " + txn);
            }
        });
}

function loadFunction() {
    const splitterBalance = address(splitterInstance).balance;
    document.getElementById("SplitterBalance").value = 'splitterBalance';
}