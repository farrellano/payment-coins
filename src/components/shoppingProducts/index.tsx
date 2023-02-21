import React, { useEffect } from "react";
import {
  Button,
  Icon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerFooter,
  DrawerHeader,
  StackDivider,
  VStack,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useDisclosure,useToast } from "@chakra-ui/react";

import { FiShoppingCart } from "react-icons/fi";
import { useShoppingCart } from "../../hook/useShoppingCart";

import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useAccount
} from "wagmi";
import { utils } from "ethers";

export default function ShoppingProductsDrawer() {
  const {isConnected} = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenErrorAlert,
    onOpen: onOpenErrorAlert,
    onClose: onCloseErrorAlert,
  } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef();
  const cancelRefAlert = React.useRef();
  const btnRef = React.useRef<HTMLInputElement>(null);
  const { cart, setCart } = useShoppingCart();

  const [total, setTotal] = React.useState("");

  useEffect(() => {
    if (Array.isArray(cart)) {
      let totalValue = 0;
      cart.forEach((item) => {
        totalValue += item.value;
      });
      setTotal(totalValue.toString());
    }
  }, [cart]);

  const [to, setTo] = React.useState(
    "0x965A5a9e2Cc01582c23811dCF49ba161D0747F71"
  );
  const [debouncedTo] = useDebounce(to, 500);

  const [debouncedAmount] = useDebounce(total, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess, isError,error } = useWaitForTransaction({
    hash: data?.hash,
  });

  const pay = () => {
   
    if(total === "0"){
      toast({
        title: "The cart is empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if(!isConnected){
      toast({
        title: "Connect your wallet",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    sendTransaction?.();
  };

  useEffect(() => {
    if (isSuccess) {
      onOpenAlert();
    }
  },[isSuccess,onOpenAlert]);

  useEffect(() => {
    console.log(error)
    if (isError) {
      onOpenErrorAlert();
    }
  },[isError,onOpenErrorAlert,error]);


  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        variant="outline"
      >
        <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            {Array.from(cart).length <= 0 ? (
              "Cart is empty"
            ) : (
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {cart.map((ca: any) => (
                  <Box key={ca.id}>
                    {ca.name} ETH {ca.value}
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Stat>
              <StatLabel>Total </StatLabel>
              <StatNumber>ETH {total}</StatNumber>
            </Stat>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => pay()}
              isLoading={isLoading}
              loadingText="Sending"
              colorScheme="blue"
            >
              Buy
            </Button>

            <AlertDialog
              isOpen={isOpenErrorAlert}
              leastDestructiveRef={cancelRefAlert}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Rejected!
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    <div>The operation is failed!</div>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      colorScheme="red"
                      onClick={onCloseErrorAlert}
                      ml={3}
                    >
                      Success
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            <AlertDialog
              isOpen={isOpenAlert}
              leastDestructiveRef={cancelRefAlert}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Congrats!
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    <div>
                      Successfully sent {total} ether to {to}
                      <div>
                        <a
                          href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Etherscan
                        </a>
                      </div>
                    </div>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button colorScheme="red" onClick={onCloseAlert} ml={3}>
                      Success
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
