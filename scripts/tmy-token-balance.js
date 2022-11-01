const TmyToken = artifacts.require('./TmyToken.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const token = await TmyToken.deployed();
  const balance = await token.balanceOf(recipient);
  console.log(balance.toString());
  done();
}
