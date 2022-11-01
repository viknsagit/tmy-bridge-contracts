// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./BaseToken.sol";

contract BinanceToken is BaseToken
{
    constructor() BaseToken("Bit","Bit") {}
}