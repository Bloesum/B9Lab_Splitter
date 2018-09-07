pragma solidity 0.4.24;

contract Splitter {
    uint public splitterBalance;
    mapping (address => uint) pendingWithdrawals;
    
    constructor () public payable {
	    splitterBalance = msg.value;
	}

	function split(address recipient1, address recipient2) public payable {
	    splitterBalance += msg.value;
	    uint splitAmount = msg.value / 2;
	    pendingWithdrawals[recipient1] += splitAmount;
	    pendingWithdrawals[recipient2] += splitAmount;
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        splitterBalance -= amount;
        msg.sender.transfer(amount);
    }
}