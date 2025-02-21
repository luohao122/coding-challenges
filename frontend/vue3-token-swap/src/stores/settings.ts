import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const darkMode = ref<boolean>(false)

  return {
    darkMode,
  }
})
