pragma solidity ^0.4.17;

// contract code will go here
contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public ristricted {
        uint256 index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    modifier ristricted() {
        require(manager == msg.sender);
        _;
    }

    function fetchAllPlayers() public view returns (address[]) {
        return players;
    }
}
