import React,{useRef,useEffect,useState} from 'react';
import { useDimensions } from '@chakra-ui/react'
import Header from '../components/head'
import ConnectWallet from '../components/wallet'
import Products from '../components/productsList'
import {
  Box
} from "@chakra-ui/react";
export default function Home() {

  const mainRef = useRef();
  const dimensions = useDimensions(mainRef);

  const [size, setSize] = useState('');

  useEffect(() => {
    if (dimensions) {
      let width = dimensions.borderBox.width;
      switch (true) {
        case width < 499:
          setSize('base');
          break;
        case width >= 499 && width < 696:
          setSize('sm');
          break;
        case width >= 696 && width < 945:
          setSize('md');
          break;
        case width >= 945:
          setSize('lg');
          break;
      }
    }
  }, [dimensions]);

  
  return (
    <>
    <Header />
    <ConnectWallet /> 
    <Box
        w="100vw"
        h="100vh"
        display="flex"
        justifyContent="center"
        ref={mainRef}
        alignItems="flex-start"
        as="main"
      >
        <Products />
    </Box>
    
    </>
  )
}
