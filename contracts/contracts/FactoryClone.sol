// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract FactoryClone {
    address immutable tokenImplementation;
    address [] tokens;
    constructor() {
        tokenImplementation = address(new ERC20PresetFixedSupplyUpgradeable());
    }
    function getTokens(uint256 startIndex, uint256 endIndex) external view returns (address [] memory) {
        require(endIndex > startIndex, "Bad input");
        address[] memory tokensAddress = new address[](endIndex - startIndex);
        uint256 index = 0;
        for (uint256 i = startIndex; i < endIndex; i++) {
            tokensAddress[index] = tokens[i];
            index++;
        }
        return tokensAddress;
    }
    function createToken(
        string calldata name,
        string calldata symbol,
        uint256 initialSupply
    ) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        ERC20PresetFixedSupplyUpgradeable(clone).initialize(name, symbol, initialSupply, msg.sender);
        tokens.push(clone);
        return clone;
    }
}
