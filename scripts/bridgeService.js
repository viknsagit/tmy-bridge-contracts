const express = require('express')
const Web3 = require('web3');

const tmyBridge = require('../build/contracts/TmyBridge.json');
const binanceBridge = require('../build/contracts/BinanceBridge.json')

const web3Tmy = new Web3('ws://127.0.0.1:7545/');
const web3Binance = new Web3('ws://127.0.0.1:8545/');

const accountPrivateKey = '1f0d4b377d41a28f05dd47a8947668144d48405886308cda8ff5a3624a524efd'; //Ключ аккаунта с которого будут создаваться все транзакции
const { address: address } = web3Binance.eth.accounts.wallet.add(accountPrivateKey);

const bridgeTmy = new web3Tmy.eth.Contract(
  tmyBridge.abi,
  tmyBridge.networks['5777'].address //Значение установить как в сети tmy
);

const bridgeBinance = new web3Binance.eth.Contract(
  binanceBridge.abi,
  binanceBridge.networks['5888'].address //Значение установить как в сети binance
);

async function TransferToBinance(transferTo, transferAmount) {
  const tx = await bridgeBinance.methods.mint(transferTo, transferAmount)
  const data = tx.encodeABI()
  const txData = {
    from: address,
    to: bridgeBinance.options.address,
    data,
    gasPrice: "1000000000",
    gas: "1000000",
  };

  const receipt = await web3Binance.eth.sendTransaction(txData);
  return (`
    Transaction hash: ${receipt.transactionHash}
    Processed transfer:
    - from ${txData.from} 
    - to ${txData.to} 
    - amount ${transferAmount} tokens
  `);
}

async function TransferToTMY(transferTo, transferAmount) {
  const tx = await bridgeTmy.methods.mint(transferTo, transferAmount)
  const data = tx.encodeABI()
  const txData = {
    from: address,
    to: bridgeTmy.options.address,
    data,
    gasPrice: "1000000000",
    gas: "1000000",
  };

  const receipt = await web3Tmy.eth.sendTransaction(txData);
  return (`
    Transaction hash: ${receipt.transactionHash}
    Processed transfer:
    - from ${txData.from} 
    - to ${txData.to} 
    - amount ${transferAmount} tokens
  `);
}

async function TmyBurn(transferTo, transferAmount) {
  const tx = await bridgeTmy.methods.burn(transferTo, transferAmount)
  const data = tx.encodeABI()
  const txData = {
    from: address,
    to: bridgeTmy.options.address,
    data,
    gasPrice: "1000000000",
    gas: "1000000",
  };

  const receipt = await web3Tmy.eth.sendTransaction(txData);
  return (`
    Transaction hash: ${receipt.transactionHash}
    Processed burn:
    - from ${txData.from} 
    - to ${txData.to} 
    - amount ${transferAmount} tokens
  `);
}

async function BinanceBurn(transferTo, transferAmount) {
  const tx = await bridgeBinance.methods.burn(transferTo, transferAmount)
  const data = tx.encodeABI()
  const txData = {
    from: address,
    to: bridgeBinance.options.address,
    data,
    gasPrice: "1000000000",
    gas: "1000000",
  };

  const receipt = await web3Binance.eth.sendTransaction(txData);
  return (`
    Transaction hash: ${receipt.transactionHash}
    Processed burn:
    - from ${txData.from} 
    - to ${txData.to} 
    - amount ${transferAmount} tokens
  `);
}


async function TransferToNet(addressFromRequest, amountOfCoinsToTransfer, transferToNet) {
  
  if (transferToNet === 'binance') {
    var log = await TmyBurn(addressFromRequest, amountOfCoinsToTransfer)
    var log1 = await TransferToBinance(addressFromRequest, amountOfCoinsToTransfer)
    return log + log1
  }

  if (transferToNet === 'tmy') {
    var log = await BinanceBurn(addressFromRequest, amountOfCoinsToTransfer)
    var log1 = await TransferToTMY(addressFromRequest, amountOfCoinsToTransfer)
    return log + log1
  }

}


const app = express()
app.get('/api/send', async function (request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  var addressFromRequest = request.query.address
  var amountOfCoinsToTransfer = request.query.amount
  var transferToNet = request.query.net
  var log = await TransferToNet(addressFromRequest, amountOfCoinsToTransfer, transferToNet)
  console.log(log)
  response.end()
})

console.log("Server started...")

app.listen(3120)