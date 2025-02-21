<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Settings</h2>

    <!-- Dark Mode Setting -->
    <div class="mb-4">
      <label
        class="flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        <span>Dark Mode</span>
        <div class="relative inline-block w-10 h-6">
          <input type="checkbox" v-model="settings.darkMode" class="peer sr-only" />
          <div
            class="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"
          ></div>
          <div
            class="absolute left-0 top-0 w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-4"
          ></div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
</script>

<style scoped></style>
