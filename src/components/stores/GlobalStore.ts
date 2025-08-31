import { create } from "zustand";
import { TypeAccountState } from "./types";
import { Prettify } from "../globalTypes/GlobalTypes";



const initialtate: TypeAccountState = {
  isSignIn: !!localStorage.getItem("loggedUser")
};

type TypeActions = {
  setIsSignIn: (isSignIn: boolean) => void;
}

type TypeStore = Prettify<{ state: TypeAccountState } & TypeActions>;

export const useAccountStore = create<TypeStore>(set => ({
  state: initialtate,
  setIsSignIn: (isSignIn: boolean) => set((store) => {
    console.log({ store });

    return ({
      state: {
        ...store.state,
        isSignIn: isSignIn
      }
    })
  })
}));

console.log(useAccountStore);