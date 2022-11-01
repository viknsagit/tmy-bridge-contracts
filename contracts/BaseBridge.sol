// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './TTS20.sol';

contract BaseBridge {
  TTS20 public token;

  event Transfer(
    address from,
    address to,
    uint amount,
    uint date
  );

  constructor(address _token) {
    token = TTS20(_token);
  }

  function burn(address to, uint amount) external {
    token._burn(to, amount);
    emit Transfer(
      msg.sender,
      to,
      amount,
      block.timestamp
    );
  }

  function mint(address to, uint amount) external {
    token._mint(to, amount);
    emit Transfer(
      msg.sender,
      to,
      amount,
      block.timestamp
    );
  }
}
