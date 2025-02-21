export type NotificationType = 'danger' | 'success' | 'info' | 'default'

export interface Notification {
  id: string
  message: string
  type?: NotificationType
}

export type NewNotification = Omit<Notification, 'id'>
