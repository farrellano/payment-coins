import React, { useState } from "react";



type Cart = {
  id: string;
  value: number;
  name: string;
};

type CartContextType = {
  cart: Cart[] | null,
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null>>
}

const iCartContextState = {
 cart: null,
 setCart: () => {}
}

const Context = React.createContext<CartContextType>(iCartContextState);

export function ShoppingCartContextProvider({ children }: any) {
  const [cart, setCart] = useState<Cart[] | null >([]);

  return (
    <Context.Provider value={{ cart, setCart }}>{children}</Context.Provider>
  );
}
export default Context;
