<template>
  <RoundedCard class="animate-pulse flex items-center p-4 bg-white dark:bg-gray-700">
    <!-- Placeholder for the circular checkbox -->
    <div class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 bg-gray-300 dark:bg-gray-600 mr-4"></div>
    <!-- Placeholder for the text (title and date) -->
    <div class="flex flex-col space-y-2 flex-1">
      <!-- Title placeholder -->
      <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <!-- Date placeholder -->
      <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from '@/components/ui/RoundedCard/RoundedCard.vue'
</script>
