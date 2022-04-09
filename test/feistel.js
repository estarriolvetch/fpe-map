const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  it("Balanced Feistel Network", async function () {
    let feistelMock = await ethers.getContractFactory("FeistelMock");
    feistelMock = await feistelMock.deploy();
    await feistelMock.deployed();

    //console.log(feistel4Mock.functions);

    let appeared = new Set();
    const size = 4; // 4 bit
    // key = 0
    for(let i=0;i<2**size;i++){
      const r = await feistelMock.feistel(i,0,3,size);
      assert(r.lt(2**4)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());  
      //console.log(r);
    }

    appeared = new Set();
    // key = 10000
    for(let i=0;i<2**size;i++){
      const r = await feistelMock.feistel(i,10000,4,size);
      assert(r.lt(2**4)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());  
    }
  });

  it("Unbalanced Feistel Network", async function () {
    let feistelMock = await ethers.getContractFactory("FeistelMock");
    feistelMock = await feistelMock.deploy();
    await feistelMock.deployed();

    //console.log(feistel4Mock.functions);

    let appeared = new Set();
    const size = 4 ; // 4 bit
    // key = 0
    for(let i=0;i<2**size;i++){
      const r = await feistelMock.feistelUnbalanced(i,0,3,size);
      assert(r.lt(2**4)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());  
      //console.log(r);
    }

    appeared = new Set();
    // key = 10000
    for(let i=0;i<2**size;i++){
      const r = await feistelMock.feistelUnbalanced(i,10000,4,size);
      assert(r.lt(2**4)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());  
    }
  });
});
