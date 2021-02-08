const BN = web3.utils.BN
const Exchange = artifacts.require("FakeExchange")
const StableCoin = artifacts.require("FakeUSD")
const PriceProvider = artifacts.require("FakePriceProvider")
const CallHedge = artifacts.require("HegicCallOptions")
const PutHedge = artifacts.require("HegicPutOptions")
const ETHPool = artifacts.require("HegicETHPool")
const ERCPool = artifacts.require("HegicERCPool")

const priceProviderSettings = {currentAnswer: new BN(200e8)}

module.exports = async function (deployer, network, accounts) {
  try {
    await deployer.deploy(StableCoin)
    await deployer.deploy(PriceProvider, priceProviderSettings.currentAnswer)
    await deployer.deploy(Exchange, PriceProvider.address, StableCoin.address)
    await deployer.deploy(PutHedge, StableCoin.address, PriceProvider.address, Exchange.address)
    await deployer.deploy(CallHedge, PriceProvider.address)
  } catch (err) {
    console.error(err)
  }
}
