var Splitter = artifacts.require("./Splitter.sol");

contract('Testing my splitter', function(accounts) {
  it("splits the send amount in half and send it to others", function() {

  	var splitter;

    // Get initial balances of first and second account.
    var account_one = accounts[1];
    var account_two = accounts[2];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var sendAmount = 10;

    return Splitter.deployed().then(function(instance) {
      splitter = instance;
      return splitter.getBalance(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return splitter.getBalance(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return splitter.split.value(sendAmount)(sendAmount, account_one, account_two);
    }).then(function() {
      return splitter.getBalance(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return splitter.getBalance(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance + ( sendAmount / 2) , "Amount wasn't correctly sent to receiver1");
      assert.equal(account_two_ending_balance, account_two_starting_balance + ( sendAmount / 2) , "Amount wasn't correctly sent to receiver2");
    });
  });
});