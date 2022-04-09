//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Feistel.sol";
import "./BitScan.sol";

library FPEMap {
    using Feistel for uint256;

    string constant DOMAIN_ERROR_MSG = "The FPE domain should be within the domain of the Fiestel network (domain <= 2 ** size)";
    string constant INPUT_OUTSIDE_DOMAIN_ERROR_MSG = "input is not within the domain";

    uint256 constant DEFAULT_ROUND = 3;

    function fpeMappingFeistel(uint256 input, uint256 key, uint256 round, uint256 size, uint256 domain) internal pure returns (uint256 output) {
        require(input < domain, INPUT_OUTSIDE_DOMAIN_ERROR_MSG);
        require(2 ** size >= domain, DOMAIN_ERROR_MSG);
        while(true) {
            output = input.feistel(key, round, size);
            if(output < domain) {
                break;
            } else {
                input = output;
            }
        }
    }

    function fpeMappingFeistelUnbalanced(uint256 input, uint256 key, uint256 round, uint256 size, uint256 domain) internal pure returns (uint256 output) {
        require(input < domain, INPUT_OUTSIDE_DOMAIN_ERROR_MSG);
        require(2 ** size >= domain, DOMAIN_ERROR_MSG);
        while(true) {
            output = input.feistelUnbalanced(key, round, size);
            if(output < domain) {
                break;
            } else {
                input = output;
            }
        }
    }

    function fpeMappingFeistelAuto(uint256 input, uint256 key, uint256 domain) internal pure returns (uint256 output) {
        require(input < domain, INPUT_OUTSIDE_DOMAIN_ERROR_MSG);
        uint256 size;
        unchecked {
            size = BitScan.log2(domain) + 1;    
        }
        
        while(true) {
            output = input.feistelUnbalanced(key, DEFAULT_ROUND, size);
            if(output < domain) {
                break;
            } else {
                input = output;
            }
        }
    }
}