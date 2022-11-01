const TmyToken = artifacts.require('./TmyToken.sol');
const BinanceToken = artifacts.require('./BinanceToken.sol');
const TmyBridge = artifacts.require('./TmyBridge.sol');
const BinanceBridge = artifacts.require('./BinanceBridge.sol');

module.exports = async function (deployer, network, addresses) {

  if(network ==='tmy')
  {
    await deployer.deploy(TmyToken);
    const tmyToken = await TmyToken.deployed();
    await tmyToken._mint(addresses[0], 1000000000000000);
    await deployer.deploy(TmyBridge, tmyToken.address);
    const tmyBridge = await TmyBridge.deployed();
  }
  if(network === 'binance')
  {
    await deployer.deploy(BinanceToken);
    const binanceToken = await BinanceToken.deployed();
    await deployer.deploy(BinanceBridge, binanceToken.address);
    const binanceBridge = await BinanceBridge.deployed();
  }
};
