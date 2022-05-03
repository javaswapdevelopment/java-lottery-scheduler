export default {
  Lottery: {
    mainnet: "0xF2C3199F8D32A69B5447E812E6Ec8C6DB322052e",
    testnet: "0x5790c3534F30437641541a0FA04C992799602998",
  },
  Chainlink: {
    Oracle: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/v1/#polygon-matic-mainnet
      mainnet: "0x3d2341adb2d31f1c5530cdc622016af293177ae0",
      testnet: "0x81faeDDfeBc2F8Ac524327d70Cf913001732224C",
    },
    VRF: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/v1/
      KeyHash: {
        mainnet: "0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da",
        testnet: "0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186",
      },
    },
  },
  Ticket: {
    Price: {
      mainnet: 5,
      testnet: 1,
    },
    Precision: {
      mainnet: 2,
      testnet: 2,
    },
  },
  Discount: {
    mainnet: 2000,
    testnet: 2000,
  },
  Rewards: {
    mainnet: [250, 375, 625, 1250, 2500, 5000],
    testnet: [250, 375, 625, 1250, 2500, 5000],
  },
  Treasury: {
    mainnet: 2000,
    testnet: 2000,
  },
};
