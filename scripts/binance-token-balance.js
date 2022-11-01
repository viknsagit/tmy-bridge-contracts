const BinanceToken = artifacts.require('./BinanceToken.sol');

module.exports = async done => {
  const [sender, _] = await web3.eth.getAccounts();
  const token = await BinanceToken.deployed();
  const balance = await token.balanceOf(sender);
  console.log(balance.toString());
  done();
}
