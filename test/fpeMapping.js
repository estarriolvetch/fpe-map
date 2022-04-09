const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("FPEMapping", function () {
  it("FPEMapping with balanced feistel network", async function () {
    let FPEMapMock = await ethers.getContractFactory("FPEMapMock");
    FPEMapMock = await FPEMapMock.deploy();
    await FPEMapMock.deployed();

    //console.log(feistel4Mock.functions);

    
    let size = 6; // use 6 bit feistel
    let round = 3
    let domain;
    let key;

    // key = 0, domain = 20
    key = 0;
    domain = 20;
    let appeared = new Set();
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistel(i,key,round, size, domain);
      //console.log(r.toString());
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());  
      //console.log(r);
    }
    
    // key = 10000, domain = 30
    size = 8 // 2 ** 8 > 100
    appeared = new Set();
    key = 10000;
    domain = 100;
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistel(i,key,round, size, domain);
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString()); 
      //console.log(r);
    }
  });

  it("FPEMapping with unbalanced feistel network", async function () {
    let FPEMapMock = await ethers.getContractFactory("FPEMapMock");
    FPEMapMock = await FPEMapMock.deploy();
    await FPEMapMock.deployed();

    //console.log(feistel4Mock.functions);

    let appeared = new Set();
    let size = 6; // use 4 bit feistel
    let round = 3
    let domain;
    let key;

    // key = 0, domain = 20
    key = 0;
    domain = 20;
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistelUnbalanced(i,key,round, size, domain);
      //console.log(r);
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());   
      
    }

    // key = 10000, domain = 100
    size = 8;
    appeared = new Set();
    key = 10000;
    domain = 100;
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistelUnbalanced(i,key,round, size, domain);
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString()); 
      //console.log(r);
    }
  });

  it("FPEMapping with auto configuration", async function () {
    let FPEMapMock = await ethers.getContractFactory("FPEMapMock");
    FPEMapMock = await FPEMapMock.deploy();
    await FPEMapMock.deployed();

    //console.log(feistel4Mock.functions);

    let domain;
    let key;

    // key = 0, domain = 20
    let appeared = new Set();
    key = 0;
    domain = 20;
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistelAuto(i,key, domain);
      //console.log(r);
      console.log(r); 
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString());   
      
    }
    console.log("==="); 

    // key = 10000, domain = 100
    appeared = new Set();
    key = 10000;
    domain = 100;
    for(let i=0;i<domain;i++){
      const r = await FPEMapMock.fpeMappingFeistelAuto(i,key, domain);
      assert(r.lt(domain)); // within the domain
      assert(!appeared.has(r.toString())); // unique
      appeared.add(r.toString()); 
    }
  });
});
