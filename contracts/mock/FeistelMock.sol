//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../Feistel.sol";

contract FeistelMock {
    using Feistel for uint256;

    function feistel(uint256 input, uint256 key, uint256 round, uint256 size) public pure returns (uint256){
        return input.feistel(key, round, size);
    }

    function feistelUnbalanced(uint256 input, uint256 key, uint256 round, uint256 size) public pure returns (uint256){
        return input.feistelUnbalanced(key, round, size);
    }
}
