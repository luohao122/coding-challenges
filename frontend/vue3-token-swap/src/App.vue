<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'

import Header from '@/components/ui/Header/Header.vue'
import Footer from '@/components/ui/Footer/Footer.vue'
import NotificationList from '@/components/ui/NotificationList/NotificationList.vue'

import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()
watch(
  () => settingsStore.darkMode,
  (newVal) => {
    if (newVal) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-800">
    <Header></Header>
    <main class="flex-grow">
      <RouterView />
    </main>
    <NotificationList />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
