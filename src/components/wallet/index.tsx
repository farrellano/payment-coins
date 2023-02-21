"use client";

// Imports
// ========================================================
import React, { useEffect, useState } from "react";
import ClientOnly from "./clientOnly";
import truncateEthAddress from "truncate-eth-address";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance
} from "wagmi";
import { fetchBalance } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Heading,
  Popover,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  PopoverTrigger,
  Portal,
  StatLabel,
  StatNumber,
  Stat,
  Icon,
  StatGroup,
} from "@chakra-ui/react";
import ShoppingProductsDrawer from '../shoppingProducts/index'


// Page
// ========================================================
export default function Wallet() {
  // State / Props
  const { address, connector, isConnected } = useAccount();
  const {
    connect,
    connectors,
    error,
    isLoading: isLoadingConnect,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const [balanceToken, setBalanceToken] = useState(BigNumber.from("0"));
  const [symbolToken, setSymbolToken] = useState("");

  const { data: dataBalance, isError: isErrorBalance } = useBalance({
    address,
  });

  useEffect(() => {
    const fetchData = async (address:any) => {
      // get the data from the api
      const balance = await fetchBalance({
        address,
        token: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", //this is a USDC Token
      });

      setBalanceToken(balance.value);
      setSymbolToken(balance.symbol);
    };
    fetchData(address).catch(console.error);
  }, [address]);

  // Render
  return (
    <div>
      <ClientOnly>
        <section>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2">
              <Heading size="md">Auto Market App</Heading>
            </Box>
            <Spacer />
            {isConnected ? (
              <Box p="2">
                <Popover closeOnBlur={false} placement="bottom">
                  {({ isOpen, onClose }) => (
                    <>
                      <PopoverTrigger>
                        <Button colorScheme="teal" variant="outline">
                          {address && truncateEthAddress(address)} /{" "}
                          {connector && connector.name}{" "}
                          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverHeader>
                            <Flex>
                              <Box>
                                {address && truncateEthAddress(address)}
                              </Box>
                              <Spacer />
                              <Box>
                                <Button
                                  variant="outline"
                                  onClick={() => disconnect()}
                                >
                                  <CloseIcon />
                                </Button>
                                <Button variant="outline">
                                  <ExternalLinkIcon />
                                </Button>
                              </Box>
                            </Flex>
                          </PopoverHeader>
                          <PopoverBody>
                            <StatGroup>
                              <Stat>
                                <StatLabel>
                                  {dataBalance && dataBalance.symbol} Balance
                                </StatLabel>
                                <StatNumber>
                                  {" "}
                                  {dataBalance &&
                                    parseFloat(
                                      ethers.utils.formatUnits(
                                        dataBalance.value,
                                        18
                                      )
                                    ).toFixed(4)}
                                </StatNumber>
                              </Stat>
                              <Stat>
                                <StatLabel>{symbolToken} Balance</StatLabel>
                                <StatNumber>
                                  {" "}
                                  {balanceToken &&
                                    parseFloat(
                                      ethers.utils.formatUnits(balanceToken, 6)
                                    ).toFixed(4)}
                                </StatNumber>
                              </Stat>
                            </StatGroup>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </>
                  )}
                </Popover>
              </Box>
            ) : (
              <Box p="2">
                {connectors.map((connector) => (
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}

                    {isLoadingConnect &&
                      connector.id === pendingConnector?.id &&
                      " (connecting)"}
                  </Button>
                ))}

                {error && <div>{error.message}</div>}
              </Box>
            )}
            <Box>
            <ShoppingProductsDrawer />
            </Box>
          </Flex>
        </section>
      </ClientOnly>
    </div>
  );
}
