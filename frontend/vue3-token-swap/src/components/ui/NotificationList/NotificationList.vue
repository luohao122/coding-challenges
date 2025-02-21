<template>
  <Teleport to="body">
    <ol class="fixed top-4 right-4 space-y-2 z-50">
      <li
        v-for="notification in notifications"
        :key="notification.id"
        :class="notificationClasses(notification)"
        class="p-4 rounded shadow-lg flex items-center justify-between"
      >
        <div class="text-sm font-semibold">
          {{ notification.message }}
        </div>
        <button
          @click="removeNotification(notification.id)"
          class="ml-4 border border-white text-white font-bold rounded px-3 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          OK
        </button>
      </li>
    </ol>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotification } from '@/composables/useNotifications'
import type { Notification } from '@/types/notification'

const { notifications, removeNotification } = useNotification()

// Return a Tailwind CSS class string based on the notification type.
const notificationClasses = (notification: Notification): string => {
  switch (notification.type) {
    case 'danger':
      return 'bg-red-500 text-white'
    case 'success':
      return 'bg-green-500 text-white'
    case 'info':
      return 'bg-blue-500 text-white'
    case 'default':
    default:
      return 'bg-gray-300 text-gray-800'
  }
}
</script>
