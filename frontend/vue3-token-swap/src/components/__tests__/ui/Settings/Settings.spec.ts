import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import Settings from '../../../ui/Settings/Settings.vue'

describe('Settings', () => {
  it('renders the settings title and toggles', () => {
    const wrapper = mount(Settings, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              settings: { darkMode: false },
            },
          }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Settings')
    const toggles = wrapper.findAll('input[type="checkbox"]')
    expect(toggles.length).toBe(2)
  })
})
