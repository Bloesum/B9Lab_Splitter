let Splitter = artifacts.require("../contracts/Splitter.sol");

Promise = require("bluebird");
Promise.promisifyAll(web3.eth, { suffix: "Promise" });

contract('Testing my splitter', function(accounts) {

  let splitter;
  let owner = accounts[0];
  let account_one = accounts[1];
  let account_two = accounts[2];
  let sendAmount = 10;

  before(function () {
  return Splitter.new()
    .then(function (_instance) {
      splitter = _instance;
    });
  });

  it("can receive amount to be split", function() {

    let contract_starting_balance;
    let contract_ending_balance;

    return web3.eth.getBalancePromise(splitter.address) 
      .then(function(balance) {
        contract_starting_balance = balance.toNumber();
        return splitter.splitFunds(account_one, account_two, {value: 10, from: owner})
      })
      .then(function(result) {
        assert.equal(0x01, result.receipt.status, "No transaction");
        return web3.eth.getBalancePromise(splitter.address);
      })
      .then(function(balance) {
        contract_ending_balance = balance.toNumber();
        assert.equal(contract_ending_balance, contract_starting_balance + sendAmount , "Amount wasn't correctly sent to contract");
      });
  });

  it("can withdraw", function() {

    let account_one_starting_balance;
    let account_one_ending_balance;
    let gas_used;
    let gas_cost;

    return web3.eth.getBalancePromise(account_one) 
      .then(function(balance) {
        account_one_starting_balance = balance.toNumber();
        return splitter.withdrawFunds({from: account_one, gasPrice: 200})
      })
      .then(function(result) {
        assert.equal(0x01, result.receipt.status, "No transaction");
        gas_used = result.receipt.gasUsed;
        gas_cost = 200 * gas_used;
        return web3.eth.getBalancePromise(account_one);
      })
      .then(function(balance) {
        account_one_ending_balance = balance.toNumber();
        assert.equal(account_one_ending_balance, account_one_starting_balance - gas_cost + (sendAmount / 2), "Amount wasn't correctly withdrawn");
      });
  });
});