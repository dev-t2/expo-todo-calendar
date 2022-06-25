// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Text {
    string public text;

    constructor(string memory _text) {
        text = _text;
    }

    function setText(string memory _text) public {
        text = _text;
    }

    function getText() public view returns (string memory) {
        return text;
    }

    function errorOccur(uint256 error) public pure returns (uint256) {
        require(error == 0, "Error");

        return error;
    }
}
