<template>
  <div class="container mx-auto p-4">
    <!-- Header Text -->
    <div class="mt-8 mb-12 text-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">Swap Your Crypto Assets</h1>
      <p class="text-lg text-gray-500 mt-2">
        Easily convert from one token to another with real-time prices.
      </p>
    </div>

    <!-- Swap Form -->
    <SwapForm :currencies="availableCurrencies" @swapConfirmed="handleSwap" />

    <!-- Display each completed swap -->
    <SwapList :swaps="swapStore.swapRecords" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTokenPriceStore } from '@/stores/token'

import SwapForm from '@/components/form/SwapForm.vue'
import SwapList from '@/components/ui/SwapList/SwapList.vue'
import type { SwapRecord } from '@/types/token'
import { useSwapStore } from '@/stores/swap-store'

const tokenPriceStore = useTokenPriceStore()
const swapStore = useSwapStore()

onMounted(() => {
  tokenPriceStore.initTokenPrices()
})

// Generate a unique list of currency symbols from the store
const availableCurrencies = computed(() => {
  // Since tokenPrices can contain duplicates or multiple entries for the same currency
  // We'll convert to a Set to remove any duplication
  const symbols = tokenPriceStore.tokenPrices.map((tp) => tp.currency)
  const uniqueSet = new Set(symbols)
  return Array.from(uniqueSet).sort()
})

function handleSwap(payload: SwapRecord) {
  swapStore.addSwapRecord(payload)
  console.log('Swap confirmed:', payload)
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
