"use client";

import {
  Grid,GridItem
    
  } from "@chakra-ui/react";
import ProductAddToCart from '../product/index'

const data1 = {
  id: 1,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1441148345475-03a2e82f9719?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  name: 'Super Car 1',
  price: 0.01
};
const data2 = {
  id: 2,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  name: 'Super Car 2',
  price: 0.02
};
const data3 = {
  id: 3,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  name: 'Super Car 3',
  price: 0.03
};
const data4 = {
  id: 4,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  name: 'Super Car 4',
  price: 0.04
};
const data5 = {
  id: 5,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  name: 'Super Car 5',
  price: 0.05
};
const data6 = {
  id: 6,
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1494697536454-6f39e2cc972d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  name: 'Super Car 6',
  price: 0.06
};

export default function Products(){
    return (
      
      <Grid
      templateColumns={{ base: '1fr', lg: 'repeat(4, 1fr)' }}
      h="100%"
      gap="10px"
      overflow="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'primary',
          borderRadius: '24px',
        },
      }}
    >
  <GridItem ><ProductAddToCart data={data1} /></GridItem>
  <GridItem ><ProductAddToCart data={data2} /></GridItem>
  <GridItem ><ProductAddToCart data={data3} /></GridItem>
  <GridItem ><ProductAddToCart data={data4} /></GridItem>
  <GridItem ><ProductAddToCart data={data5}/></GridItem>
  <GridItem ><ProductAddToCart data={data6} /></GridItem>
</Grid>
        
    );
}