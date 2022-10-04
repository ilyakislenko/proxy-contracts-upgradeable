import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()
    await deploy("FactoryClone", {
        from: deployer,
        log: true,
    })
}

module.exports.tags = ["FactoryClone"]
