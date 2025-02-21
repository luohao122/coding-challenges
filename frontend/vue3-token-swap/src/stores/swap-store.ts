import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { SwapRecord } from '@/types/token'

export const useSwapStore = defineStore('swap', () => {
  const swapRecords = ref<SwapRecord[]>([])

  function addSwapRecord(record: SwapRecord) {
    swapRecords.value.push(record)
  }

  return {
    swapRecords,
    addSwapRecord
  }
})
