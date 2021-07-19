import create from "zustand";
import createContext from "zustand/context";
import produce from "immer";

let store;

const initialState = {
  viewCounts: {},
};

export const { Provider, useStore } = createContext();

export const initializeStore = (preloadedState = {}) => {
  return create((set) => ({
    ...initialState,
    ...preloadedState,
    incrementViewCount: (id) => {
      set((state) =>
        produce(state, (draftState) => {
          draftState.viewCounts[id]++;
        })
      );
    },
  }));
};

export function useCreateStore(initialState) {
  // if on the server, create a completely new store
  if (typeof window === "undefined") {
    return () => initializeStore(initialState);
  }

  // on the client side, always reference the same store
  store = store ?? initializeStore(initialState);

  return () => store;
}
