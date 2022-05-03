import type { HardhatUserConfig } from "hardhat/types";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
  const [operator] = await ethers.getSigners();

  console.log(`Operator address: ${operator.address}`);
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [process.env.OPERATOR_PRIVATE_KEY!],
    },
    mainnet: {
      url: "https://speedy-nodes-nyc.moralis.io/e96d98785aa4103240081490/polygon/mainnet",
      chainId: 137,
      accounts: [process.env.OPERATOR_PRIVATE_KEY!],
    },
  },
};

export default config;
