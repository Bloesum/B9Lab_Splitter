pragma solidity 0.4.24;

contract Splitter {
    mapping (address => uint) userBalances;
    
    event LogSplitFunds(address indexed from, address indexed to1, address indexed to2, uint amount, uint remainder);
    event LogWithdrawFunds(address indexed from, uint amount);
    
    constructor () public { }

    function splitFunds(address recipient1, address recipient2) public payable {
        require(recipient1 != 0 && recipient2 != 0, "No empty recipient");
        uint splitAmount = msg.value / 2;
        uint remainder = msg.value - ( 2 * splitAmount);
        
        userBalances[recipient1] += splitAmount;
        userBalances[recipient2] += splitAmount;
        
        if ( remainder > 0) {
           userBalances[msg.sender] += remainder; 
        }
        
        emit LogSplitFunds(msg.sender, recipient1, recipient2, splitAmount, remainder);
    }

    function withdrawFunds() public {
        uint amount = userBalances[msg.sender];
        userBalances[msg.sender] = 0;
        emit LogWithdrawFunds(msg.sender, amount);
        msg.sender.transfer(amount);
        }
}