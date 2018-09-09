pragma solidity 0.4.24;

contract Splitter {
    mapping (address => uint) pendingWithdrawals;
    
    event logSplit(address indexed from, address indexed to1, address indexed to2, uint amount, uint remainder);
    event logWithdraw(address indexed from, uint amount);
    
    constructor () public payable {
    }

    function split(address recipient1, address recipient2) public payable {
        require(recipient1 != 0 && recipient2 != 0, "No empty recipient");
        uint splitAmount = msg.value / 2;
        uint remainder = msg.value - ( 2 * splitAmount);
        
        pendingWithdrawals[recipient1] += splitAmount;
        pendingWithdrawals[recipient2] += splitAmount;
        
        if ( remainder > 0) {
           pendingWithdrawals[msg.sender] += remainder; 
        }
        
        emit logSplit(msg.sender, recipient1, recipient2, splitAmount, remainder);
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
        emit logWithdraw(msg.sender, amount);
    }
}