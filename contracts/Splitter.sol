pragma solidity 0.4.24;

contract Splitter {
	address private creator;
	uint public splitterBalance;
	
	event logTransfer(address indexed _from, address indexed _to1, address indexed _to2, uint _amount);
	
	constructor () public payable {
	    creator = msg.sender;
	    splitterBalance = msg.value;
	}
	
	function split(address recipient1, address recipient2) public payable {
	    uint splitAmount = msg.value / 2;
        recipient1.transfer(splitAmount);
	    recipient2.transfer(splitAmount);
	    emit logTransfer(msg.sender, recipient1, recipient2, splitAmount );
	}
	
	function kill() public {
        if (msg.sender == creator) selfdestruct(msg.sender);
    }
    
    function () public payable {}
}