import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useNotification } from '@/composables/useNotifications'
import type { TokenPrice } from '@/types/token'

export const useTokenPriceStore = defineStore('tokenPrices', () => {
  const isLoading = ref<boolean>(false)
  const error = ref<null | string>(null)
  const tokenPrices = ref<TokenPrice[]>([])
  const { addNotification } = useNotification()

  async function fetchTokenPrices() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/tokenPrices')
      if (!response.ok) {
        error.value = 'Failed to fetch token prices!'
        addNotification({ message: 'Failed to fetch token prices!', type: 'danger' })
        console.error('Failed to fetch token prices!')
        return
      }
      const tokenPricesList = await response.json()
      tokenPrices.value = tokenPricesList
    } catch (err) {
      console.error(err)
      error.value = err as unknown as null
      addNotification({ message: 'An error occured while fetching token prices.', type: 'danger' })
    } finally {
      isLoading.value = false
    }
  }

  async function initTokenPrices() {
    await fetchTokenPrices()
  }

  return {
    tokenPrices,
    error,
    isLoading,
    initTokenPrices,
    fetchTokenPrices,
  }
})
