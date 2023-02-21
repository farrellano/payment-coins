import { useContext } from "react";
import  Context  from "../context/shoppingCartContextProvider";


export function useShoppingCart() {
    const cart = useContext(Context);
    return cart;
  }
  