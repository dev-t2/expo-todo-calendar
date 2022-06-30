// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Text {
  string public _text;

  constructor(string memory text) {
    _text = text;
  }

  function setText(string memory text) public {
    _text = text;
  }

  function getText() public view returns (string memory) {
    return _text;
  }

  function errorOccur(uint256 error) public pure returns (uint256) {
    require(error == 0, 'Error');

    return error;
  }
}
