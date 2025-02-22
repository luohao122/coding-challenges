import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSkeleton from '../../../ui/LoadingSkeleton/LoadingSkeleton.vue'

describe('LoadingSkeleton', () => {
  it('renders the skeleton placeholder structure', () => {
    const wrapper = mount(LoadingSkeleton)

    // Check the main wrapper has 'animate-pulse'
    expect(wrapper.classes()).toContain('animate-pulse')

    // Optionally, check for the presence of placeholder divs
    // For example, let's verify there's at least one .h-8 div
    const placeholderInputs = wrapper.findAll('.h-8.bg-gray-300')
    expect(placeholderInputs.length).toBeGreaterThan(0)

    // You can further check other classes or elements as needed
    // For instance, verifying the presence of .w-32 for the button placeholder
    const buttonPlaceholder = wrapper.find('.h-10.w-32')
    expect(buttonPlaceholder.exists()).toBe(true)
  })
})
