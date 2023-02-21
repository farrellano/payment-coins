import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { goerli } from "wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: "WUGK8R7WYSB6XG8ANT1GBR9EWXMEVJ6QYK",
      chainId: goerli.id,
      contracts: [
        {
          name: "Token USDC",
          address: {
            [goerli.id]: "0x5eCd6D0E14B84F43F796B82534abFeEf6784e267",
          },
        },
      ],
    }),
    react(),
  ],
});
