pragma solidity ^0.4.17;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function doMath(int256 a, int256 b) public {
        a + b;
        a - b;
        a * b;
        a == 0;
    }
    // as public variable gets its own function made to get it, so no need for get message function
    // function getMessage() public view returns (string) {
    //     return message;
    // }
}
