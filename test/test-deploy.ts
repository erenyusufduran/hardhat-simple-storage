import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let simpleStorage: SimpleStorage;
  let simpleStorageFactory: SimpleStorage__factory;
  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0.", async function () {
    const currentValue = await simpleStorage.getFavoriteNumber();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue); // assert and expect doing same things.
  });
  it("Favorite number should update when we call store.", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.getFavoriteNumber();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
