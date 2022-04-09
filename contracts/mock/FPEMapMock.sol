//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../FPEMap.sol";

contract FPEMapMock {
    using FPEMap for uint256;

    function fpeMappingFeistel(uint256 input, uint256 key, uint256 round, uint256 size, uint256 domain) public pure returns (uint256){
        return input.fpeMappingFeistel(key, round, size, domain);
    }

    function fpeMappingFeistelUnbalanced(uint256 input, uint256 key, uint256 round, uint256 size, uint256 domain) public pure returns (uint256){
        return input.fpeMappingFeistelUnbalanced(key, round, size, domain);
    }

    function fpeMappingFeistelAuto(uint256 input, uint256 key, uint256 domain) public pure returns (uint256){
        return input.fpeMappingFeistelAuto(key, domain);
    }
}