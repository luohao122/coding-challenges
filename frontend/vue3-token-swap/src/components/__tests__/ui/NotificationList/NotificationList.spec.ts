import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'

import NotificationList from '../../../ui/NotificationList/NotificationList.vue'

// Prepare mock notifications.
const mockNotifications = ref([
  { id: '1', message: 'Error occurred', type: 'danger' },
  { id: '2', message: 'Success!', type: 'success' },
  { id: '3', message: 'For your info', type: 'info' },
  { id: '4', message: 'Default message', type: 'default' },
])

// Create a mock function for removeNotification.
const mockRemoveNotification = vi.fn()

// Mock the useNotification composable.
vi.mock('@/composables/useNotifications', () => {
  return {
    useNotification: () => ({
      notifications: mockNotifications,
      removeNotification: mockRemoveNotification,
    }),
  }
})

describe('NotificationList', () => {
  it('renders notifications with correct messages and classes', async () => {
    // Mount the component, attaching it to the document body so Teleport content is rendered.
    mount(NotificationList, {
      attachTo: document.body,
    })
    await flushPromises()

    // Query the teleported content from document.body.
    // since we have 4 mocked notifications, we expected for 4
    const listItems = document.body.querySelectorAll('ol > li')
    expect(listItems.length).toBe(4)

    // Check first notification (danger)
    expect(listItems[0].textContent).toContain('Error occurred')
    expect(listItems[0].className).toContain('bg-red-500')

    // Check second notification (success)
    expect(listItems[1].textContent).toContain('Success!')
    expect(listItems[1].className).toContain('bg-green-500')

    // Check third notification (info)
    expect(listItems[2].textContent).toContain('For your info')
    expect(listItems[2].className).toContain('bg-blue-500')

    // Check fourth notification (default)
    expect(listItems[3].textContent).toContain('Default message')
    expect(listItems[3].className).toContain('bg-gray-300')
  })

  it('calls removeNotification when OK button is clicked', async () => {
    mount(NotificationList, {
      attachTo: document.body,
    })
    await flushPromises()

    // Find the first OK button within the teleported notifications.
    const okButton = document.body.querySelector('ol > li button')
    expect(okButton).toBeTruthy()
    if (okButton) {
      // Trigger a click event on the OK button.
      okButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await flushPromises()
      // Verify that the removeNotification function was called with the ID of the first notification.
      expect(mockRemoveNotification).toHaveBeenCalledWith('1')
    }
  })
})
