import set from 'date-fns/set'
import { produce } from 'immer'
import create from 'zustand'
import createContext from 'zustand/context'
import { devtools } from 'zustand/middleware'

let store

export const initialState = {
  viewCounts: {},
  isLoggedIn: false,
}

export const { Provider, useStore } = createContext()

export const initializeStore = (preloadedState = {}) => {
  return create(
    devtools((set) => ({
      ...initialState,
      ...preloadedState,
      incrementViewCount: (id) => {
        set(
          (state) =>
            produce(state, (draftState) => {
              draftState.viewCounts[id]++
            }),
          false
        )
      },
      setIsLoggedIn: (b) => set({ isLoggedIn: !!b }),
    }))
  )
}

export function useCreateStore(initialState) {
  // if on the server, create a completely new store
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState)
  }

  // on the client side, always reference the same store
  if (localStorage.getItem('authToken')) {
    initialState.isLoggedIn = true
  }
  store = store ?? initializeStore(initialState)

  return () => store
}
