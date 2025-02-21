import type { NewNotification, Notification } from '@/types/notification'
import { ref } from 'vue'

const notifications = ref<Notification[]>([])

const removeNotification = (id: string) => {
  notifications.value = notifications.value.filter((noti) => noti.id !== id)
}

const addNotification = ({ message, type }: NewNotification) => {
  const id = Date.now().toString()
  notifications.value = [...notifications.value, { id, message, type }]

  // Self-remove the newly added notification after 5s
  setTimeout(() => removeNotification(id), 5000)
}

export function useNotification() {
  return {
    notifications,
    removeNotification,
    addNotification,
  }
}
