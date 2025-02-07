import { parseUnits } from "@ethersproject/units";
import { ethers, network } from "hardhat";
import lotteryABI from "../abi/JavaSwapLottery.json";
import config from "../config";
import { isTimeToRun, getEndTime } from "../utils";
import logger from "../utils/logger";

/**
 * Start lottery.
 */
const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;

  // Get signer to sign the transaction(s).
  const [operator] = await ethers.getSigners();

  // Check if the network is supported.
  if (networkName === "testnet" || networkName === "mainnet") {
    const timeToRun = await isTimeToRun(networkName);
    if (timeToRun) {
      // Check if the JavaSwap Lottery / Chainlink Oracle smart contract addresses are set.
      if (
        config.Lottery[networkName] === ethers.constants.AddressZero ||
        config.Chainlink.Oracle[networkName] === ethers.constants.AddressZero
      ) {
        throw new Error("Missing smart contract (Lottery / Chainlink Oracle) addresses.");
      }

      try {
        // Bind the smart contract address to the ABI, for a given network.
        const contract = await ethers.getContractAt(lotteryABI, config.Lottery[networkName]);

        // Get network data for running script.
        const [_blockNumber, _gasPrice] = await Promise.all([
          ethers.provider.getBlockNumber(),
          ethers.provider.getGasPrice(),
        ]);

        // Get ticket price (denominated in $Cake), for a given network.
        const ticketPrice: string = "1";

        // Create, sign and broadcast transaction.
        const tx = await contract.startLottery(
          getEndTime(),
          parseUnits(ticketPrice, "ether"),
          config.Discount[networkName],
          config.Rewards[networkName],
          config.Treasury[networkName],
          { from: operator.address, gasLimit: 500000, gasPrice: _gasPrice.mul(2) }
        );

        const message = `[${new Date().toISOString()}] network=${networkName} block=${_blockNumber} message='Started lottery' hash=${
          tx?.hash
        } signer=${operator.address}`;
        console.log(message);
        logger.info({ message });
      } catch (error:any) {
        const message = `[${new Date().toISOString()}] network=${networkName} message='${error.message}' signer=${
          operator.address
        }`;
        console.error(message);
        logger.error({ message });
      }
    }
  } else {
    const message = `[${new Date().toISOString()}] network=${networkName} message='Unsupported network' signer=${
      operator.address
    }`;
    console.error(message);
    logger.error({ message });
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
