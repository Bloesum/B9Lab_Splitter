pragma solidity 0.4.24;

contract Splitter {
    mapping (address => uint) pendingWithdrawals;
    
    event logSplit(address indexed _from, address indexed _to1, address indexed _to2, uint _amount, uint _remainder, uint _balance);
    event logWithdraw(address indexed _from, uint _amount, uint _balance);
    
    constructor () public payable {
    }

    function split(address recipient1, address recipient2) public payable {
        uint splitAmount = msg.value / 2;
        uint remainder = msg.value - ( 2 * splitAmount);
        pendingWithdrawals[recipient1] += splitAmount;
        pendingWithdrawals[recipient2] += splitAmount;
        emit logSplit(msg.sender, recipient1, recipient2, splitAmount, remainder, address(this).balance );
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
        emit logWithdraw(msg.sender, amount, address(this).balance);
    }
}