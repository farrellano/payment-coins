import React, { useState } from "react";

const Context = React.createContext({});

type Cart = {
  id: string;
  value: number;
  name: string;
};

export function ShoppingCartContextProvider({ children }: any) {
  const [cart, setCart] = useState<Cart[]>([]);

  return (
    <Context.Provider value={{ cart, setCart }}>{children}</Context.Provider>
  );
}
export default Context;
