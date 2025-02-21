<template>
  <div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-2">
    <!-- FROM side -->
    <div class="flex items-center space-x-2">
      <img
        :src="tokenImageUrl(swap.fromCurrency)"
        alt="from currency icon"
        class="w-6 h-6 object-contain"
      />
      <span class="text-gray-700 dark:text-gray-300">
        {{ swap.fromAmount }} {{ swap.fromCurrency }}
      </span>
    </div>
    <!-- TO side -->
    <div class="flex items-center space-x-2">
      <img
        :src="tokenImageUrl(swap.toCurrency)"
        alt="to currency icon"
        class="w-6 h-6 object-contain"
      />
      <span class="text-gray-700 dark:text-gray-300">
        {{ swap.toAmount }} {{ swap.toCurrency }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import type { SwapRecord } from '@/types/token';

defineProps<{
  swap: SwapRecord
}>()

function tokenImageUrl(symbol: string) {
  // Convert symbol to uppercase if that matches the repo’s convention
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol.toUpperCase()}.svg`
}
</script>

<style scoped></style>
