import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import RoundedCard from '../../../ui/RoundedCard/RoundedCard.vue'

describe('RoundedCard', () => {
  it('renders slot content', () => {
    const wrapper = mount(RoundedCard, {
      slots: {
        default: '<div class="test-content">Content here</div>',
      },
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Content here')
  })

  it('has the correct classes', () => {
    const wrapper = mount(RoundedCard)
    // Expected classes: "flex", "items-center", "bg-white", "p-4", "rounded-full", "shadow-md", "border", "border-gray-200", "cursor-pointer"
    const classes = wrapper.classes()
    expect(classes).toContain('flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('bg-white')
    expect(classes).toContain('p-4')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('shadow-md')
    expect(classes).toContain('border')
    expect(classes).toContain('border-gray-200')
    expect(classes).toContain('cursor-pointer')
  })
})
