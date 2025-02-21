<template>
  <div>
    <SwapItem
      v-for="(swap, index) in swaps"
      :key="index"
      :swap="swap"
      :tokenImageUrl="tokenImageUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import SwapItem from '@/components/ui/SwapItem/SwapItem.vue'
import type { SwapRecord } from '@/types/token';

defineProps<{
  swaps: SwapRecord[]
}>()
</script>

<style scoped></style>
