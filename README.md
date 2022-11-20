# FPE-MAP

[![Test](https://github.com/estarriolvetch/fpe-map/actions/workflows/node.js.yml/badge.svg)](https://github.com/estarriolvetch/fpe-map/actions/workflows/node.js.yml)
[![Publish Package to npmjs](https://github.com/estarriolvetch/fpe-map/actions/workflows/deploy_npm.yml/badge.svg)](https://github.com/estarriolvetch/fpe-map/actions/workflows/deploy_npm.yml)
[![npm version](https://badge.fury.io/js/fpe-map.svg)](https://www.npmjs.com/package/fpe-map)

**FPE Map is releasd under MIT opensource licence and free to use. If you need commercial support/service regarding FPE Map, feel free to contact [ctor.xyz](https://ctor.xyz)**

FPE Map is a framework for efficently create unpredicatable mappings between NFT token ID and metadata and can be used for creating fair NFT mysterybox revealing. 

Powered by the encryption algorithm, any small change in the supplied random number results in a drastically different mapping between token IDs and the metadata, making rarity snipping impossible. FPE Map requires storing only one random number on-chain, regardless of the size of the NFT collection. This is the reason why it is extremely gas efficient. (20000x more efficient than Clone X's approach)

- Litepaper: https://mirror.xyz/ctor.xyz/ZEY5-wn-3EeHzkTUhACNJZVKc0-R6EsDwwHMr5YJEn0

## Installaion
### npm
```
npm install fpe-map
```
### yarn
```
yarn add fpe-map
```

## Usage
The easiest way to use FPE Map is using `fpeMappingFeistelAuto` which automatically configure the block size of the encryption core and other parameters  within the algorithm.
```solidity
uint256 metadataId = FPEMap.fpeMappingFeistelAuto(tokenId, randomSeed, maxSupply) 
```
If the token ID is not starting from `0`, one can do a simple modification to include that.
```solidity
uint256 metadataId = startTokenId +
  FPEMap.fpeMappingFeistelAuto(tokenId - startTokenId, randomSeed, maxSupply) 
```

## Projects powered by fpe-map
- [ZombiePod Genesis](https://twitter.com/get_turned)
- [Godpod](https://opensea.io/collection/godpod-goddy)
