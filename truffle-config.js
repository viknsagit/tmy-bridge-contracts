const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'vocal poverty end spy lizard symbol army pluck exercise harbor ahead offer'; 
//Используется для авторизации в ноде,должна совпадать с тем аккаунтом откуда создаются транзакции

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

//Здесь нужно поменять значение на настоящие из сетей
  networks: {
    tmy: {
      provider: () => new HDWalletProvider(
        mnemonic,
        'http://127.0.0.1:7545'
      ),
      network_id: 5777,
      skipDryRun: true
    },
    binance: {
      provider: () => new HDWalletProvider(
        mnemonic,
        'http://127.0.0.1:8545'
      ),
      network_id: 5888,
      skipDryRun: true
    }
    
    
    
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
