var Splitter = artifacts.require("../contracts/Splitter.sol");

contract('Testing my splitter', function(accounts) {

  // beforeEach('setup contract for each test', function () {
  //   splitter = Splitter.new();
  // }); TODO

  it("can receive amount to be split", function() {

  	var splitter;
    var account_one = accounts[1];
    var account_two = accounts[2];
    var contract_starting_balance;
    var contract_ending_balance;
    var sendAmount = 10;

    return Splitter.deployed().then(function(instance) {
      splitter = instance;
      return web3.eth.getBalance(splitter.address).toNumber();
    }).then(function(balance) {
      contract_starting_balance = balance;
      return splitter.split(account_one, account_two, {value: 10});
    }).then(function(result) {
      return web3.eth.getBalance(splitter.address).toNumber();
    }).then(function(balance) {
      contract_ending_balance = balance;
      assert.equal(contract_ending_balance, contract_starting_balance + sendAmount , "Amount wasn't correctly sent to contract");
    });
  });

  it("can withdraw", function() {

    var splitter;
    var account_one = accounts[1];
    var account_one_starting_balance;
    var account_one_ending_balance;
    var sendAmount = 10;

    return Splitter.deployed().then(function(instance) {
      splitter = instance;
      return web3.eth.getBalance(account_one).toNumber();
    }).then(function(balance) {
      account_one_starting_balance = balance;
      splitter.withdraw({from: account_one});
      return web3.eth.getBalance(account_one).toNumber();
    }).then(function(balance) {
      account_one_ending_balance = balance;
      assert.equal(account_one_ending_balance, account_one_starting_balance + ( '10' / 2 ), "Amount wasn't correctly withdrawn");
    });
  });
});