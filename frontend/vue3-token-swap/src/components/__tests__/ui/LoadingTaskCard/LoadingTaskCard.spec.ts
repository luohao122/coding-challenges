import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LoadingTaskCard from '../../../ui/LoadingTaskCard/LoadingTaskCard.vue'

describe('LoadingTaskCard', () => {
  it('renders the skeleton with correct classes', () => {
    const wrapper = mount(LoadingTaskCard)

    // Check the outer container has animate-pulse, proper background classes, and layout classes.
    expect(wrapper.classes()).toContain('animate-pulse')
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('items-center')

    // Since RoundedCard might add additional classes, we can check for our specific ones:
    expect(wrapper.classes()).toContain('p-4')

    // Check that the container has dark mode classes applied.
    expect(wrapper.classes()).toContain('bg-white')

    // Find the placeholder for the circular checkbox.
    const checkboxPlaceholder = wrapper.find('div.w-8.h-8.rounded-full')
    expect(checkboxPlaceholder.exists()).toBe(true)
    // Verify it has the expected border and background classes.
    expect(checkboxPlaceholder.classes()).toContain('border-2')
    expect(checkboxPlaceholder.classes()).toContain('border-gray-300')

    // Find the text placeholders (one for title, one for date).
    const textPlaceholders = wrapper.findAll('div.flex.flex-col.space-y-2 > div')
    expect(textPlaceholders.length).toBeGreaterThanOrEqual(2)

    // Check specific width classes for each placeholder.
    const titlePlaceholder = textPlaceholders[0]
    const datePlaceholder = textPlaceholders[1]
    expect(titlePlaceholder.classes()).toContain('w-3/4')
    expect(datePlaceholder.classes()).toContain('w-1/2')
  })
})
