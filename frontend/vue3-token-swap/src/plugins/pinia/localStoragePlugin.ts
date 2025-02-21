import type { PiniaPluginContext } from 'pinia'

const localStoragePlugin = (context: PiniaPluginContext) => {
  const { store } = context

  // Check if the stored had been saved to localStorage
  const storedState = localStorage.getItem(store.$id)

  // If yes, update the store to reflect the one
  // from localStorage
  if (storedState) {
    store.$patch(JSON.parse(storedState))
  }

  // Subscribe to changes to the store
  // then saved it to the localStorage
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}

export default localStoragePlugin
